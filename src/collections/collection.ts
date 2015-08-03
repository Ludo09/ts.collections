import {collections as iter} from './iterable';

export module collections {
    export interface Collection<E> extends iter.Iterable<E> {
        clear();

        contains(e: E): boolean;

        empty(): boolean;

        size(): number;

        remove(e: E);
    }
}