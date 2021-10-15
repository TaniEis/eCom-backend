import mongoose from "mongoose";
import dbHandler from "./dbHandler";
import watchService from "./service";
import Watch from "./model.js";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.closeDatabase();
});

/**
 * Watch create test suite.
 */
describe('watch create ', () => {
    /**
     * Tests that a valid watch can be created through the watchService without throwing any errors.
     */
    it('can be created correctly without throwing any errors', async () => {
        expect(async () => {
            await watchService.create(watchComplete);
        })
            .not
            .toThrow();
    });

    /**
     * Should throw an error when watch doesn't have fields.
     */
    it('requires watch_id + name + price + discount', async () => {
        await expect(watchService.create(watchMissingId))
            .rejects
            .toThrow(mongoose.Error.ValidationError);

        await expect(watchService.create(watchMissingName))
            .rejects
            .toThrow(mongoose.Error.ValidationError);

        await expect(watchService.create(watchMissingDiscount))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

    /**
     * Watch should exist after being created.
     */
    it('exists after being created', async () => {
        await watchService.create(watchComplete);

        const createdWatch = await Watch.findOne();

        expect(createdWatch.watch_id)
            .toBe(watchComplete.watch_id);
    });

});

const watchComplete = {
    watch_id: '0033',
    name: 'COOL WATCH',
    price: 75,
    discount_qty:2,
    discount_percentage:3
};

const watchMissingId = {
    name: 'COOL WATCH',
    price: 75,
    discount_qty:2,
    discount_percentage:3
};

const watchMissingName = {
    watch_id: '0033',
    price: 75,
    discount_qty:2,
    discount_percentage:3
};

const watchMissingDiscount = {
    watch_id: '0033',
    name: 'COOL WATCH',
    discount_qty:2,
    discount_percentage:3
};