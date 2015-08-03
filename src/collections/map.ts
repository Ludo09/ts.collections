export module collections {
    export class Map<K, V> {
        private _keys:Array<K> = [];
        private _values:Array<V> = [];

        public size():number {
            return this._keys.length;
        }

        public empty():boolean {
            return this._keys.length == 0;
        }

        public clear() {
            this._keys.splice(0, this._keys.length);
            this._values.splice(0, this._values.length);
        }

        public set(key:K, value:V) {
            var idx = this._keys.indexOf(key);

            if (idx == -1) {
                this._keys.push(key);
                this._values.splice(this._keys.length - 1, 0, value);
            } else {
                this._values[idx] = value;
            }
        }

        public get(key:K):V {
            var idx = this._keys.indexOf(key);
            if (idx == -1) throw new Error("No such key found");
            return this._values[idx];
        }

        public remove(key:K) {
            var idx = this._keys.indexOf(key);
            if (idx != -1) {
                this._keys.splice(idx, 1);
                this._values.splice(idx, 1);
            }
        }

        public has(key:K) {
            return this._keys.indexOf(key) != -1;
        }

        // todo doesn't work with deep object hierachies because not a deep clone, only shallow copy
        // todo return Set<K> instead
        public keys():Array<K> {
            return this._keys.slice();
        }

        // todo doesn't work with deep object hierachies because not a deep clone, only shallow copy
        public values():Array<V> {
            return this._values.slice();
        }

        public entries():Array<Map.Entry<K,V>> {
            var entries:Array<Map.Entry<K,V>> = [];
            for (var i = 0; i < this._keys.length; i++)
                entries.push(new Map.Entry<K,V>(this._keys[i], this._values[i]));
            return entries;
        }

        public forEach(callbackfn:(value:V, key:K, map:Map<K, V>) => void, thisArg?:any):void {
            var that = this;
            for (var i = 0; i < this._keys.length; i++)
                callbackfn.call(this, that._values[i], that._keys[i]);
        }
    }

    export module Map {
        export class Entry<K,V> {
            private _key:K;
            private _value:V;

            constructor(key:K, value:V) {
                this._key = key;
                this._value = value;
            }

            public get key(): K {
                return this._key;
            }

            public get value(): V {
                return this._value;
            }

            public set value(value:V) {
                this._value = value;
            }
        }
    }
}

