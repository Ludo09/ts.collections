/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import m = require("../../src/collections/list");

describe('Test List', function () {
    var list = null;

    beforeEach(function () {
        list = new m.collections.List<number>();
    });

    afterEach(function () {
        list = null;
    });

    it('should be created', function () {
        expect(list).not.toBeNull();
    });

    it('should be empty when created', function () {
        expect(list.empty()).toBe(true);
    });

    it('should not be empty when one element is appended', function () {
        list.append(5);
        expect(list.empty()).toBe(false);
    });

    it('should have 0-size when created', function () {
        expect(list.size()).toEqual(0);
    });

    it('should increase size when elements are added', function () {
        list.append(5);
        expect(list.size()).toEqual(1);
        list.append(6);
        expect(list.size()).toEqual(2);
    });

    it('should throw proper exception when out of bounds', function () {
        expect(function () {
            list.get(-3);
        }).toThrow(new Error("Index out of bounds"));

        list.append(5);
        expect(function () {
            list.get(2);
        }).toThrow(new Error("Index out of bounds"));
    });

    it('should return correct values', function () {
        list.append(5);
        list.append(6);
        expect(list.get(0)).toEqual(5);
        expect(list.get(1)).toEqual(6);
    });

    it('should throw proper exception when out of bounds', function () {
        expect(function () {
            list.set(-3, 5);
        }).toThrow(new Error("Index out of bounds"));

        list.append(5);
        expect(function () {
            list.set(2, 6);
        }).toThrow(new Error("Index out of bounds"));
    });

    it('should replace value when set at existing position', function () {
        list.append(5);
        expect(list.get(0)).toEqual(5);
        list.set(0, 6);
        expect(list.get(0)).toEqual(6);
    });

    it('should throw proper exception when out of bounds', function () {
        expect(function () {
            list.add(-3, 5);
        }).toThrow(new Error("Index out of bounds"));

        list.append(5);
        expect(function () {
            list.add(2, 6);
        }).toThrow(new Error("Index out of bounds"));
    });

    it('should replace value when set at existing position', function () {
        list.append(5);
        list.append(6);
        list.append(7);
        expect(list.size()).toEqual(3);
        list.add(2, 8);
        expect(list.size()).toEqual(4);
        expect(list.get(2)).toEqual(8);
        expect(list.get(3)).toEqual(7);
    });

    it('should remove all of the elements when list is cleared out', function () {
        list.append(5);
        list.append(6);
        list.append(7);
        expect(list.size()).toEqual(3);
        list.clear();
        expect(list.size()).toEqual(0);
    });

    it('should throw proper exception when out of bounds', function () {
        expect(function () {
            list.removeAt(-3);
        }).toThrow(new Error("Index out of bounds"));

        list.append(5);
        expect(function () {
            list.removeAt(2);
        }).toThrow(new Error("Index out of bounds"));
    });

    it('should throw proper exception when out of bounds', function () {
        list.append(5);
        list.append(6);
        list.removeAt(1);
        expect(list.get(0)).toEqual(5);
        expect(list.size()).toEqual(1);
    });

    it('should remove nothing when element doesn\'t exist', function () {
        list.append(5);
        list.append(6);
        list.remove(3);
        expect(list.size()).toEqual(2);
    });

    it('should return index of -1 when element doesn\'t exist', function () {
        expect(list.indexOf(3)).toEqual(-1);
    });

    it('should return proper index when element exists', function () {
        list.append(5);
        list.append(6);
        list.append(7);
        expect(list.indexOf(7)).toEqual(2);
    });

    it('should return index of -1 when element doesn\'t exist', function () {
        expect(list.lastIndexOf(3)).toEqual(-1);
    });

    it('should return proper last index when element exists', function () {
        list.append(5);
        list.append(5);
        list.append(5);
        expect(list.lastIndexOf(5)).toEqual(2);
    });

    it('should append all elements', function () {
        list.append(1);
        list.append(2);
        var l2 = new m.collections.List<number>();
        l2.append(3);
        l2.append(4);
        list.appendAll(l2);
        expect(list.size()).toEqual(4);
        expect(list.indexOf(3)).toEqual(2);
        expect(list.indexOf(4)).toEqual(3);
    });

    it('should throw proper exception when out of bounds', function () {
        expect(function () {
            list.addAll(-3, null);
        }).toThrow(new Error("Index out of bounds"));

        list.append(5);
        expect(function () {
            list.addAll(2, null);
        }).toThrow(new Error("Index out of bounds"));
    });

    it('should add all elements at specified position', function () {
        list.append(1);
        list.append(2);
        list.append(5);
        var l2 = new m.collections.List<number>();
        l2.append(3);
        l2.append(4);
        list.addAll(2, l2);
        expect(list.size()).toEqual(5);
        expect(list.indexOf(3)).toEqual(2);
        expect(list.indexOf(4)).toEqual(3);
        expect(list.indexOf(5)).toEqual(4);
    });

    it('should throw proper exception when out of bounds', function () {
        expect(function () {
            list.subList(-3, 0);
        }).toThrow(new Error("Index out of bounds"));

        expect(function () {
            list.subList(0, 3);
        }).toThrow(new Error("Index out of bounds"));

        list.append(5);
        expect(function () {
            list.subList(1, 0);
        }).toThrow(new Error("Index out of bounds"));
    });

    it('should add all elements at specified position', function () {
        list.append(1);
        list.append(2);
        list.append(3);
        list.append(4);
        list.append(5);

        var l = list.subList(2, 2);
        expect(l.empty()).toEqual(true);

        l = list.subList(1, 3);
        expect(l.size()).toEqual(2);
        expect(l.get(0)).toEqual(2);
        expect(l.get(1)).toEqual(3);
    });

    it('should find element if part of the list', function() {
        expect(list.contains(3)).toBe(false);
        list.append(2);
        list.append(3);
        list.append(4);
        list.append(5);
        expect(list.contains(3)).toBe(true);
    });

    it('should apply function for each entry', function () {
        list.append(3);
        list.append(4);
        list.append(5);
        var sumVal = 0;
        var sumIdx = 0;
        list.forEach(function (value: number, index: number, l: m.collections.List<number>) {
            sumVal += value;
            sumIdx += index;
        });
        expect(sumVal).toEqual(12);
        expect(sumIdx).toEqual(3);
    });

    it('should iterate through the whole list', function() {
        list.append(3);
        list.append(4);
        list.append(5);
        var it = list.iterator();
        expect(it.hasNext()).toBe(true);
        expect(it.next()).toEqual(3);
        expect(it.hasNext()).toBe(true);
        expect(it.next()).toEqual(4);
        expect(it.hasNext()).toBe(true);
        expect(it.next()).toEqual(5);
        expect(it.hasNext()).toBe(false);
    });

    it('should  throw error when iterate through empty list', function() {
        var it = list.iterator();
        expect(function () {
            it.next();
        }).toThrow(new Error("No next element"));
    });

    it('should remove element while iterating', function() {
        list.append(3);
        list.append(4);
        list.append(5);
        var it = list.iterator();
        it.next(); // cursor == 1
        it.remove();
        it.remove();
        expect(list.size()).toEqual(1);
        expect(list.get(0)).toEqual(3);
    });
    it('should remove all elements while iterating', function() {
        list.append(3);
        list.append(4);
        list.append(5);
        var it = list.iterator();
        it.remove();
        it.remove();
        it.remove();
        expect(list.empty()).toBe(true);
    });
});