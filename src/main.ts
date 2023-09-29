import * as IOE_ from 'fp-ts/IOEither';
import { IOEither } from "fp-ts/IOEither";
import * as O_ from 'fp-ts/Option';
import * as R_ from 'fp-ts/Record'
import {flow, pipe} from "fp-ts/function";
import * as RX_ from "rxjs";
import * as IO_ from "fp-ts/IO";
import {IO} from "fp-ts/IO";
import * as Eq_ from "fp-ts/Eq";
import {Eq} from "fp-ts/Eq";
import * as N_ from "fp-ts/number";
import * as NEA_ from 'fp-ts/NonEmptyArray'
import * as A_ from 'fp-ts/Array'
import {NonEmptyArray} from "fp-ts/NonEmptyArray";
import {tap} from "rxjs";

const run = <T>(io: IO<T>): T => io()

type Context = CanvasRenderingContext2D

const getCanvas =
    flow(
        () => document.getElementById('game-map') as HTMLCanvasElement | null,
        O_.fromNullable,
        IOE_.fromOption(() => 'Canvas not found')
    )

const getContext = (canvas: HTMLCanvasElement): IOEither<string, Context> =>
    pipe(
        O_.fromNullable(canvas.getContext('2d') as Context | null),
        IOE_.fromOption(() => 'Cannot create context')
    )

/**
 * Events
 */

enum ActionType {
    Move,
    ChangeDirection,
}
type ActionPayload = {
    [ActionType.ChangeDirection]: Direction,
    [ActionType.Move]: null,
}

type Action<T extends ActionType> = {
    type: T,
    payload: ActionPayload[T],
}
const action = <T extends ActionType>(type: T, payload: ActionPayload[T]): Action<T> => ({ type, payload })

// Tick
const movementSpeed = 200
const moveEvent$ = RX_.interval(movementSpeed).pipe(RX_.map(() => action(ActionType.Move, null)))

const keyEvent$ = RX_.fromEvent(document, 'keydown')

// Direction
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
const keyMap = {
    'ArrowUp': Direction.Up,
    'ArrowDown': Direction.Down,
    'ArrowLeft': Direction.Left,
    'ArrowRight': Direction.Right
}
const changeDirectionEvent$ = keyEvent$
    .pipe(RX_.map((event) =>
        R_.lookup((event as KeyboardEvent).key, keyMap)
    ))
    .pipe(RX_.filter(O_.isSome))
    .pipe(RX_.map((direction) => action(ActionType.ChangeDirection, direction.value)))


// Eating
//                                                  New food position
const eatFood$ = new RX_.Subject<Position>()

/**
 * Game
 */

const CELL_SIZE = 20
const MAP_WIDTH = 25
const MAP_HEIGHT = 25
const MAX_X = MAP_WIDTH - 1
const MAX_Y = MAP_HEIGHT - 1
const randomInt = (min: number, max: number): IO<number> => () => Math.floor(Math.random() * (max - min + 1) + min)

type Position = { x: number, y: number }
const randomPosition: IO<Position> = pipe(
    IO_.Do,
    IO_.bind('x', () => randomInt(0, MAX_X)),
    IO_.bind('y', () => randomInt(0, MAX_Y)),
)

const positionEq: Eq<Position> = Eq_.struct({
    x: N_.Ord,
    y: N_.Ord,
})

const drawCell = (context: Context, position: Position, color: string): IO<void> => () => {
    context.fillStyle = color
    context.fillRect(position.x * CELL_SIZE, position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}

const drawBackground = (context: Context, color: string): IO<void> => () => {
    context.fillStyle = color
    context.fillRect(0, 0, MAP_WIDTH * CELL_SIZE, MAP_HEIGHT * CELL_SIZE)
}

type GameState = {
    snake: NonEmptyArray<Position>,
    food: { position: Position },
    direction: Direction,
}
const initialState: IO<GameState> = pipe(
    IO_.Do,
    IO_.bind('snake', () => () => {
        const head = randomPosition()
        return pipe(
            [head],
            A_.append(nextPosition(Direction.Left)(head))
        )
    }
    ),
    IO_.bind('food', () => pipe(
        IO_.Do,
        IO_.bind('position', () => randomPosition),
    )),
    IO_.bind('direction', () => IO_.of(Direction.Right)),
)

type AppState = {
    canvas: HTMLCanvasElement,
    context: Context,
    gameState: GameState
}
const state: IOEither<string, AppState> = pipe(
    IOE_.Do,
    IOE_.bind('canvas', () => getCanvas()),
    IOE_.bind('context', ({ canvas }) => getContext(canvas)),
    IOE_.bind('gameState', () => IOE_.fromIO(initialState)),
)

const nextPosition = (direction: Direction) => (pos: Position): Position => {
    switch(direction) {
        // if current head is on border
        case Direction.Right:
            return {
                x: pos.x === MAX_X ? 0 : pos.x + 1,
                y: pos.y,
            };
        case Direction.Left:
            return {
                x: pos.x === 0 ? MAX_X : pos.x - 1,
                y: pos.y,
            };
        case Direction.Up:
            return {
                x: pos.x,
                y: pos.y === 0 ? MAX_Y : pos.y - 1,
            };
        case Direction.Down:
            return {
                x: pos.x,
                y: pos.y === MAX_Y ? 0 : pos.y + 1,
            }
    }
}

const moveReducer: (state: GameState, _: ActionPayload[ActionType.Move]) => GameState = flow(
    ({ snake, ...state }: GameState) => ({
        ...state,
        snake: pipe(
            snake,
            NEA_.mapWithIndex((i, pos) => pipe(
                snake,
                A_.lookup(i - 1),
                O_.match(
                    () => pos,
                    posHead => posHead
                )
            )),
            NEA_.modifyHead(nextPosition(state.direction)),
        )
    }),
)
type Reducers<S, T extends string|number, P extends Record<T, any>> = {
    [K in T]: (state: S, payload: P[K]) => S
}
type GameReducer = Reducers<GameState, ActionType, ActionPayload>
const reducers: GameReducer = {
    [ActionType.Move]: moveReducer,
    [ActionType.ChangeDirection]: (state: GameState, direction: ActionPayload[ActionType.ChangeDirection]): GameState => ({
        ...state,
        direction,
    }),
}
const callReducer = <T extends ActionType>(reducers: GameReducer, state: GameState, action: Action<T>): GameState => (
    action.type in reducers
        ? reducers[action.type](state, action.payload)
        : state
)

const drawSnake = (context: Context, snake: GameState['snake']): IO<void> => flow(
    drawCell(context, snake[0], '#8e0000'),
    () => snake.slice(1).forEach(pos => run(drawCell(context, pos, 'red'))),
)
const drawMap = ({ context, gameState: state }: AppState) => flow(
    drawBackground(context, '#fafafa'),
    drawCell(context, state.food.position, 'blue'), // draw mouse
    drawSnake(context, state.snake),
)
const effectOnAction = <T extends ActionType>(state: AppState, lastAction: Action<T>): IO<void> => (
     lastAction.type === ActionType.Move
        ? drawMap(state)
        : () => {}
)

const middleware = ()

const app: IOEither<string, void> = pipe(
    state,
    IOE_.chain((state) => {
        const game$ =
            RX_.merge(moveEvent$, changeDirectionEvent$)
                .pipe(
                    RX_.scan<Action<ActionType>, [GameState, Action<ActionType>]>(
                        ([state], action) => [
                            callReducer(reducers, state, action),
                            action,
                        ],
                        [
                            state.gameState,
                            {} as Action<ActionType> // It's any way will be replaced with real action
                        ]
                    )
                )
                // Middleware
                .pipe(tap(([state, action]) => {
                   if (action.type === ActionType.Move) {
                       const { food, snake, ...rest } = state
                       const consumed = positionEq.equals(snake[0], food.position)
                       // TODO: Move it to on eat reducer, and here only to fire such an event
                       return (
                           consumed ? {
                                   ...rest,
                                   food: consumed
                                       ? { position: randomPosition() }
                                       : food,
                                   snake: consumed
                                       ? pipe(snake, A_.append(NEA_.last(snake)))
                                       : snake,
                               }
                               : state
                       )
                   }
                }))

        game$.subscribe(
            ([nextGameState, lastAction]) => {
                const nextState = { ...state, gameState: nextGameState }
                run(
                    effectOnAction(nextState, lastAction)
                )
            }
        )

        state.canvas.width = CELL_SIZE * MAP_WIDTH
        state.canvas.height = CELL_SIZE * MAP_WIDTH
        return IOE_.fromIO(drawMap(state))
    })
)

app()
