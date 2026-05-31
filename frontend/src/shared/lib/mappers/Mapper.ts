export abstract class Mapper<I, O> {
  public abstract from(input: I): O;
}
