import Watch from "./model.js";

/**
 * Stores a new watch into the database.
 * @param {Object} watch object to create.
 * @throws {Error} If the watch is not provided.
 */
 export const create = async (watch) => {
    if (!watch)
        throw new Error('Missing watch');

    await Watch.create(watch);
};

/**
 * Retrieves a watch by watch_id.
 * @param {String} watch_id of Watch
*/
export const getById = async (watch_id) => {
    const WatchId = await Watch.findById(watch_id);
    return WatchId;
};