import "cross-fetch/dist/node-polyfill.js"; // Need for Pocketbase
import PocketBase from "pocketbase";
const url = "https://saving-stuff.pockethost.io";
const client = new PocketBase(url);

/**
 *
 * @param {string} recordId Id of the record to get
 * @returns {Promise<Record>} Record object
 */
export function get_secret_by_id(recordId: string) {
  return client.collection("secrets").getOne(recordId);
}

/**
 *
 * @param {string} recordId Id of the record to get
 * @param {Promise<Record[]>} body Array of records
 * @returns
 */
export function update_secret_by_id(recordId: string, body = {}) {
  return client.collection("secrets").update(recordId, body);
}

/**
 * When a user try to access a secret, we hit the secret to mark it as already open
 * @param {string} record_id Id of the record to get
 * @returns {Promise<Record>} Record object
 */
export async function hit_secret(record_id: string) {
  const secret = await get_secret_by_id(record_id);
  if (secret.already_open) return null;
  return await update_secret_by_id(record_id, { already_open: true });
}

/**
 * 
 * @param {string} secret_content Content of the secret
 * @returns {Promise<Record>} Record object created
 */
export async function create_secret_func(secret_content: string) {
  if (!secret_content?.toString().trim()) throw new Error("secret_content is required");
  if (secret_content.length > 1024) throw new Error("Length of secret_content must be less than 1024 characters");

  return client
    .collection("secrets")
    .create({ content: secret_content });
}

/*
// Returns a paginated records list.
🔓 pb.collection(collectionIdOrName).getList(page = 1, perPage = 30, queryParams = {});

// Returns a list with all records batch fetched at once
// (by default 200 items per request; to change it set the `batch` query param).
🔓 pb.collection(collectionIdOrName).getFullList(queryParams = {});

// Returns the first found record matching the specified filter.
🔓 pb.collection(collectionIdOrName).getFirstListItem(filter, queryParams = {});

// Returns a single record by its id.
🔓 pb.collection(collectionIdOrName).getOne(recordId, queryParams = {});

// Creates (aka. register) a new record.
🔓 pb.collection(collectionIdOrName).create(bodyParams = {}, queryParams = {});

// Updates an existing record by its id.
🔓 pb.collection(collectionIdOrName).update(recordId, bodyParams = {}, queryParams = {});

// Deletes a single record by its id.
🔓 pb.collection(collectionIdOrName).delete(recordId, queryParams = {});
*/
