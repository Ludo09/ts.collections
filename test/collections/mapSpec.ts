/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import {collections as coll} from '../../src/collections/map';

describe('Test Map', ()=> {
    let map = null;

    beforeEach(()=> {
        map = new coll.Map<string, string>();
    });

    afterEach(()=> {
        map = null;
    });

    it('should be created', ()=> {
        expect(map).not.toBeNull();
    });

    it('should be empty when created', ()=> {
        expect(map.empty()).toBe(true);
    });

    it('should not be empty when one element is added', ()=> {
        map.set("k", "v");
        expect(map.empty()).toBe(false);
    });

    it('should have 0-size when created', ()=> {
        expect(map.size()).toEqual(0);
    });

    it('should increase size when elements are added', ()=> {
        map.set("a", "b");
        expect(map.size()).toEqual(1);
        map.set("c", "d");
        expect(map.size()).toEqual(2);
    });

    it('should empty map when cleared', ()=> {
        map.set("a", "b");
        map.set("c", "d");
        expect(map.size()).toEqual(2);
        map.clear();
        expect(map.empty()).toBe(true);
    });

    it('should return correct values', ()=> {
        map.set("a", "b");
        map.set("c", "d");
        expect(map.get("a")).toEqual("b");
        expect(map.get("c")).toEqual("d");
    });

    it('should throw an exception if a key does not exist', ()=> {
        expect(()=> {
            map.get("a");
        }).toThrow(new Error("No such key found"));
    });

    it('should replace value with same key', ()=> {
        map.set("a", "b");
        map.set("a", "d");
        expect(map.get("a")).toEqual("d");
    });

    // todo Make sure that two (non-equal) keys with the same hash do not overwrite each other

    it('should not decrement size below 0', ()=> {
        map.remove("a");
        expect(map.size()).toEqual(0);
    });

    it('should decrement size when element is removed', ()=> {
        var map = new coll.Map();
        map.set("a", "b");
        map.set("c", "d");
        map.remove("a");
        expect(map.size()).toEqual(1);
        map.remove("c");
        expect(map.size()).toEqual(0);
    });

    it('should throw exception if get after element is removed', ()=> {
        map.set("a", "b");
        map.remove("a");
        expect(()=> {
            map.get("a");
        }).toThrow(new Error("No such key found"));
    });

    it('should not contain key for new map', ()=> {
        expect(map.has("a")).toBe(false);
    });

    it('should contain key for map when key was previoulsy inserted', ()=> {
        map.set("a", "b");
        expect(map.has("a")).toBe(true);
    });

    // todo Check that contains is not fooled by equivalent hash codes

    it('should return empty array of keys for new map', ()=> {
        var keys = map.keys();
        expect(keys instanceof Array).toBe(true);
        expect(keys.length == 0).toBe(true);
    });

    it('should return cloned array of keys with different references', ()=> {
        var ks1 = map.keys();
        var ks2 = map.keys();
        expect(ks1 !== ks2).toBe(true);
    });

    it('should return cloned array of keys with proper keys', ()=> {
        map.set("a", "b");
        map.set("c", "d");
        var ks1 = map.keys();
        expect(ks1.length).toEqual(2);
        expect(ks1[0]).toEqual("a");
        expect(ks1[1]).toEqual("c");
    });

    it('should return empty array of values for new map', ()=> {
        var values = map.values();
        expect(values instanceof Array).toBe(true);
        expect(values.length == 0).toBe(true);
    });

    it('should return cloned array of values with different references', ()=> {
        var vs1 = map.values();
        var vs2 = map.values();
        expect(vs1 !== vs2).toBe(true);
    });

    it('should return cloned array of values with proper values', ()=> {
        map.set("a", "b");
        map.set("c", "d");
        var vs1 = map.values();
        expect(vs1.length).toEqual(2);
        expect(vs1[0]).toEqual("b");
        expect(vs1[1]).toEqual("d");
    });

    it('should return empty array of entries for new map', ()=> {
        var entries = map.entries();
        expect(entries instanceof Array).toBe(true);
        expect(entries.length == 0).toBe(true);
    });

    it('should return array of entries for map', ()=> {
        map.set("a", "b");
        map.set("c", "d");
        var entries = map.entries();
        expect(entries.length == 2).toBe(true);
        expect(entries[0].key).toEqual("a");
        expect(entries[1].value).toEqual("d");
    });

    it('should apply function for each entry', ()=> {
        map.set("a", "b");
        map.set("c", "d");
        var concat = "";
        map.forEach(function (value: string, key: string, map: m.collections.Map<string, string>) {
            concat += key + ":"+  value;
        });
        expect(concat).toEqual("a:bc:d");
    });
});