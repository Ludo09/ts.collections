/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import m = require("../../src/collections/multiset");

describe('Test Multiset', function () {
    var mset = null;

    beforeEach(function () {
        mset = new m.collections.Multiset<string>();
    });

    afterEach(function () {
        mset = null;
    });

    it('should be created', function () {
        expect(mset).not.toBeNull();
    });

    it('should be empty when created', function () {
        expect(mset.empty()).toBe(true);
        expect(mset.size()).toEqual(0);
    });

    it('should count 0 when multiset is empty', function () {
        expect(mset.count()).toEqual(0);
    });

    it('should throw error when occurences is negative', function () {
        expect(function () {
            mset.add("a", -1);
        }).toThrow(new Error("Occurrences cannot be negative"));
    });

    it('should count 2 when element is added twice in double call', function () {
        mset.add("a");
        mset.add("a");
        expect(mset.count("a")).toEqual(2);
    });

    it('should count 2 when element is added twice in single call', function () {
        mset.add("a", 2);
        expect(mset.count("a")).toEqual(2);
    });

    it('should not contain element if never added', function () {
        expect(mset.contains("a")).toBe(false);
    });

    it('should contain element if already added', function () {
        mset.add("a", 2);
        expect(mset.contains("a")).toBe(true);
    });

    it('should empty multiset if cleared', function () {
        mset.add("a");
        mset.add("a");
        mset.clear();
        expect(mset.size()).toEqual(0);
        expect(mset.count("a")).toEqual(0);
    });

    it('should throw error when occurences is negative', function () {
        expect(function () {
            mset.remove("a", -1);
        }).toThrow(new Error("Occurrences cannot be negative"));
    });

    it('should count 2 when element is removed twice in double call', function () {
        mset.add("a", 4);
        expect(mset.count("a")).toEqual(4);
        mset.remove("a");
        mset.remove("a");
        expect(mset.count("a")).toEqual(2);
    });

    it('should count 2 when element is removed in single call', function () {
        mset.add("a", 4);
        expect(mset.count("a")).toEqual(4);
        mset.remove("a",2);
        expect(mset.count("a")).toEqual(2);
    });

    it('should throw error when count is negative', function () {
        expect(function () {
            mset.setCount("a", -1);
        }).toThrow(new Error("Count cannot be negative"));
    });

    it('should remove element when setCount(0)', function () {
        mset.add("a", 4);
        mset.add("b", 3);
        mset.setCount("a", 0);
        expect(mset.size()).toEqual(3);
    });

    it('should remove elements when new count < old count', function () {
        mset.add("a", 4);
        mset.setCount("a", 2);
        expect(mset.size()).toEqual(2);
        expect(mset.count("a")).toEqual(2);
    });

    it('should remove elements when new count < old count', function () {
        mset.add("a", 4);
        mset.setCount("a", 6);
        expect(mset.size()).toEqual(6);
        expect(mset.count("a")).toEqual(6);
    });

    it('should remove elements when new count < old count', function () {
        mset.setCount("a", 2);
        expect(mset.size()).toEqual(2);
        expect(mset.count("a")).toEqual(2);
    });
});
