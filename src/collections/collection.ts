/// <reference path="iterable.ts"/>

import m = require("./iterable");

export module collections {
    export interface Collection<E> extends m.collections.Iterable<E> {
        clear();

        contains(e: E): boolean;

        empty(): boolean;

        size(): number;

        remove(e: E);
    }
}