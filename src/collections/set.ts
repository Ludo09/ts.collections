export module collections {
    export class Set<E> {
        private _elements:Array<E> = [];

        public size():number {
            return this._elements.length;
        }

        public empty():boolean {
            return this._elements.length == 0;
        }

        public add(e:E):boolean {
            if (!this.contains(e)) {
                this._elements.push(e);
                return true;
            }
            return false;
        }

        public contains(e:E):boolean {
            for (var i = 0; i < this._elements.length; i++)
                if (this._elements[i] === e)
                    return true;
            return false;
        }

        public clear() {
            this._elements.length = 0;
        }

        private indexOf(e:E) {
            for (var i = 0; i < this._elements.length; i++)
                if (this._elements[i] === e)
                    return i;
            return -1;
        }

        public remove(e:E) {
            var index:number = this.indexOf(e);
            if (index > -1)
                this._elements.splice(index, 1);
        }

        public entries():Array<E> {
            return this._elements.slice();
        }

        public diff(s:Set<E>):Set<E> {
            var s2 = s.entries();
            var sd = new Set<E>();

            for (var i = 0; i < this.size(); i++)
                if (s.indexOf(this._elements[i]) < 0)
                    sd.add(this._elements[i]);
            for (var i = 0; i < s.size(); i++)
                if (this.indexOf(s2[i]) < 0)
                    sd.add(s2[i]);
            return sd;
        }

        public union(s:Set<E>):Set<E> {
            var s2 = s.entries();
            var sd = new Set<E>();

            for (var i = 0; i < this.size(); i++)
                sd.add(this._elements[i]);
            for (var i = 0; i < s.size(); i++)
                sd.add(s2[i]);
            return sd;
        }

        public intersect(s:Set<E>):Set<E> {
            var s2 = s.entries();
            var sd = new Set<E>();

            for (var i = 0; i < this.size(); i++)
                if (s.indexOf(this._elements[i]) > -1)
                    sd.add(this._elements[i]);
            for (var i = 0; i < s.size(); i++)
                if (this.indexOf(s2[i]) > -1)
                    sd.add(s2[i]);
            return sd;
        }

        public powerSet():Set<Set<E>> {
            var ps = new Set<Set<E>>();
            var aps:Array<Array<E>> = this.arrayPowerSet();
            for (var i = 0; i < aps.length; i++) {
                var s = new Set<E>();
                for (var j = 0; j < aps[i].length; j++) {
                    s.add(aps[i][j]);
                }
                ps.add(s);
            }

            return ps;
        }

        private arrayPowerSet():Array<Array<E>> {
            var ps:Array<Array<E>> = [[]];
            for (var i = 0; i < this._elements.length; i++) {
                for (var j = 0, len = ps.length; j < len; j++) {
                    ps.push(ps[j].concat(this._elements[i]));
                }
            }

            return ps;
        }
    }
}
