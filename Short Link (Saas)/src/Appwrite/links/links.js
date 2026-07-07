import { Client, TablesDB, ID, Query, Role, Permission } from "appwrite";
import { conf } from "../../conf/conf";
import { customAlphabet } from "nanoid";

export class LinkService {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.databases = new TablesDB(this.client);
  }

  async createLink({
    userId,
    url,
    title,
    customAlias,
    isActive,
    passwordProtected,
    password,
    expiresAt,
    clickLimitEnabled,
    clicks,
    visibility,
    tags,
  }) {
    const nanoid = customAlphabet(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      6,
    );

    const shortCode = customAlias || nanoid();

    try {
      const link = await this.databases.createRow({
        tableId: conf.appwriteLinksCollectionId,
        databaseId: conf.appwriteDatabaseId,
        rowId: ID.unique(),
        data: {
          original_url: url,
          userId,
          title,
          custom_alias: shortCode,
          is_active: isActive,
          password_protected: passwordProtected,
          password_hash: password,
          expires_at: expiresAt,
          click_limit: clicks,
          one_time_use: clickLimitEnabled,
          visibility,
          tags,
        },
        permissions: [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ],
      });

      return link;
    } catch (error) {
      console.log(`CREATE LINK ERROR: ${error}`);
      throw error;
    }
  }

  async updateLink(rowId, data) {
    try {
      const res = await this.databases.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteLinksCollectionId,
        rowId,
        data,
      });

      return res;
    } catch (error) {
      console.log(`UPDATE LINK ERROR: ${error}`);
    }
  }

  async searchAlias({ alias }) {
    try {
      const res = await this.databases.listRows({
        tableId: conf.appwriteLinksCollectionId,
        databaseId: conf.appwriteDatabaseId,
        queries: [Query.equal("custom_alias", alias)],
      });

      return res;
    } catch (error) {
      console.log(`SEARCH ALIAS ERROR: ${error}`);
      throw error;
    }
  }
}
