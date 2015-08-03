/// <reference path="map.ts"/>

import m = require("./map");

export module collections {
    export class Multiset<E> {
        private _elements:m.collections.Map<E, number>;
        private _size:number;

        constructor() {
            this._elements = new m.collections.Map<E, number>();
            this._size = 0;
        }

        public empty():boolean {
            return this._size == 0;
        }

        public size():number {
            return this._size;
        }

        public count(e:E):number {
            return !this._elements.has(e) ? 0 : this._elements.get(e);
        }

        public add(e:E);

        // todo occurence == 0?
        public add(e:E, occurences?:number) {
            var numberToBeAdded;
            if (occurences) {
                if (occurences < 0)
                    throw new Error('Occurrences cannot be negative');
                else
                    numberToBeAdded = occurences;
            } else {
                numberToBeAdded = 1;
            }

            var newCount = this.count(e) + numberToBeAdded;
            this._size += numberToBeAdded;
            this._elements.set(e, newCount);
        }

        public contains(e:E):boolean {
            return this._elements.has(e);
        }

        public remove(e:E);

        // todo occurence == 0?
        public remove(e:E, occurences?:number) {
            var numberToBeRemoved;
            if (occurences) {
                if (occurences < 0)
                    throw new Error('Occurrences cannot be negative');
                else
                    numberToBeRemoved = occurences;
            } else {
                numberToBeRemoved = 1;
            }
            var oldCount = this.count(e);
            var newCount = oldCount - numberToBeRemoved;
            if (newCount < 1) {
                this._elements.remove(e);
                this._size -= oldCount;
            } else {
                this._elements.set(e, newCount);
                this._size -= newCount - oldCount;
            }
        }

        public clear() {
            this._elements.clear();
            this._size = 0;
        }

        public setCount(e:E, count:number) {
            if (count < 0)
                throw new Error('Count cannot be negative');
            if (count == 0) {
                this._size -= this.count(e);
                this._elements.remove(e);
            } else {
                var oldCount = this.count(e);
                this._elements.set(e, count);
                this._size += count - oldCount;
            }
        }
    }
}
