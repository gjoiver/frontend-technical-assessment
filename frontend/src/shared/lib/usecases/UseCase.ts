/**
 * Base contract for a use case (application business action).
 * Receives input params and returns a Promise with the result.
 *
 * @typeParam S - input params (use `void` when the use case takes no input)
 * @typeParam T - result type
 */
export interface UseCase<S, T> {
  execute(params: S): Promise<T>;
}
