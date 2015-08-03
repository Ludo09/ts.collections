/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import m = require("../../src/collections/set");

describe('Test Set', function () {
    var set = null;

    beforeEach(function () {
        set = new m.collections.Set<number>();
    });

    afterEach(function () {
        set = null;
    });

    it('should be created', function () {
        expect(set).not.toBeNull();
    });

    it('should be empty when created', function () {
        expect(set.empty()).toBe(true);
    });

    it('should not be empty when one element is added', function () {
        set.add(5);
        expect(set.empty()).toBe(false);
    });

    it('should have 0-size when created', function () {
        expect(set.size()).toEqual(0);
    });

    it('should increase size when different elements are added', function () {
        expect(set.add(5)).toBe(true);
        expect(set.size()).toEqual(1);
        expect(set.add(6)).toBe(true);
        expect(set.size()).toEqual(2);
    });

    it('should not increase size when same elements are added twice', function () {
        expect(set.add(5)).toBe(true);
        expect(set.size()).toEqual(1);
        expect(set.add(5)).toBe(false);
        expect(set.size()).toEqual(1);
    });

    it('should return false if set doesn\'t contain specified element', function () {
        expect(set.contains(5)).toBe(false);
    });

    it('should return true if set contains specified element', function () {
        set.add(5);
        expect(set.contains(5)).toBe(true);
    });

    it('should return true if set contains specified element', function () {
        set.add(5);
        set.add(6);
        set.add(7);
        expect(set.size()).toEqual(3);
        set.clear();
        expect(set.empty()).toBe(true);
    });

    it('should remove nothing if set doesn\'t contain specified element', function () {
        set.add(5);
        set.remove(6);
        expect(set.size()).toEqual(1);
    });

    it('should remove specified element if found', function () {
        set.add(5);
        set.add(6);
        set.remove(6);
        expect(set.size()).toEqual(1);
        expect(set.contains(5)).toBe(true);
    });

    it('should return entries array', function () {
        set.add(5);
        set.add(6);
        set.add(3);
        var a:Array<number> = set.entries();
        expect(a.length).toEqual(3);
        expect(a.indexOf(5) > -1).toBe(true);
        expect(a.indexOf(6) > -1).toBe(true);
        expect(a.indexOf(3) > -1).toBe(true);
    });

    it('should return the difference with specified set', function () {
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        var s2 = new m.collections.Set<number>();
        s2.add(1);
        s2.add(3);
        s2.add(4);
        s2.add(7);
        var sd = set.diff(s2).entries();
        expect(sd.length).toEqual(2);
        expect(sd[0]).toEqual(2);
        expect(sd[1]).toEqual(7);
    });

    it('should return the union with specified set', function () {
        set.add(1);
        set.add(2);
        var s2 = new m.collections.Set<number>();
        s2.add(2);
        s2.add(3);
        var sd = set.union(s2).entries();
        expect(sd.length).toEqual(3);
        expect(sd[0]).toEqual(1);
        expect(sd[1]).toEqual(2);
        expect(sd[2]).toEqual(3);
    });

    it('should return the intersection with specified set', function () {
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        var s2 = new m.collections.Set<number>();
        s2.add(1);
        s2.add(3);
        s2.add(4);
        s2.add(7);
        var sd = set.intersect(s2).entries();
        expect(sd.length).toEqual(3);
        expect(sd[0]).toEqual(1);
        expect(sd[1]).toEqual(3);
        expect(sd[2]).toEqual(4);
    });

    it('should return all possible subset as powerset', function () {
        set.add(1);
        set.add(2);
        var ps = set.powerSet().entries();
        expect(ps.length).toEqual(4);

        expect(ps[0].empty()).toBe(true);

        expect(ps[1].size()).toEqual(1);
        expect(ps[1].entries()[0]).toEqual(1);

        expect(ps[2].size()).toEqual(1);
        expect(ps[2].entries()[0]).toEqual(2);

        expect(ps[3].size()).toEqual(2);
        expect(ps[3].entries()[0]).toEqual(1);
        expect(ps[3].entries()[1]).toEqual(2);
    });
});
