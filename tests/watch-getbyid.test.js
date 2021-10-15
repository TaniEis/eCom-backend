import mongoose from "mongoose";
import {connect, closeDatabase, clearDatabase} from "./db-handler";
import watchService from "./service";
import Watch from "./model.js";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await connect();
});

/**
 * Seed the database.
 */
beforeEach(async () => {
    await createWatchs();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await closeDatabase();
});

/**
 * Watch getById test suite.
 */
describe('watch getById ', () => {
    /**
     * Should return null if getById doesn't find any watch with the provided id.
     */
    it('should return null if nothing is found', async () => {
        await expect(watchService.getById(mongoose.Types.ObjectId()))
            .resolves
            .toBeNull();
    });

    /**
     * Should return the correct watch if getById finds the watch with the provided id.
     */
    it('should retrieve correct watch if id matches', async () => {
        const foundWatch = await watchService.getById(watchCasioId);

        expect(foundWatch.watch_id).toBe(watchCasioId);
        expect(foundWatch.name).toBe(watchCasio.name);
    });
});

/**
 * Seed the database with watchs.
 */
const createWatchs = async () => {
    const createdwatch = await Watch.create(watchCasio);
    watchCasioId = createdwatch.watch_id;
    await Watch.create(watchRuff);
};

let watchCasioId

const watchCasio = {
    watch_id: '0009',
    name: 'Casio',
    price: 175,
    discount_qty:4,
    discount_percentage:1
};

const watchRuff = {
    watch_id: '0010',
    name: 'Ruff',
    price: 375,
    discount_qty:3,
    discount_percentage:1
};