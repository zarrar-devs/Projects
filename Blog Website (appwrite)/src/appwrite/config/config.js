import { conf } from "../../conf/conf";
import { Client, ID, Storage, Query, TablesDB, Permission, Role } from "appwrite";


class Database {
  client = new Client()
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)

    this.databases = new TablesDB(this.client)
    this.storage = new Storage(this.client)

  }

  // create new post saar 
  async createPost({ title, content, featuredIMG, status, userID, slug, Date }) {


    try {
      return await this.databases.createRow({
        databaseId: conf.appwriteDbId,
        tableId: conf.appwriteTableId,
        rowId: ID.unique(),
        data: {
          title,
          content,
          featuredIMG,
          // status: status === 'true',
          status,
          userID,
          slug,
          Date
        },
        permissions: (
          status ? [
            Permission.read(Role.any()),
            Permission.update(Role.user(userID)),
            Permission.delete(Role.user(userID))

          ]
          : [
              Permission.read(Role.user(userID)),
              Permission.update(Role.user(userID)),
              Permission.delete(Role.user(userID))

            ]
        ),
      })

    } catch (error) {
      console.log(`APPWRITE-CREATEPOST-ERROR: ${error}`);
      return false
    }
  }

  // update post saar 
  async updatePost({ title, slug, rowId, content, featuredIMG, status, userID }) {
    try {
      return await this.databases.updateRow({
        tableId: conf.appwriteTableId,
        databaseId: conf.appwriteDbId,
        rowId,
        data: {
          title,
          content,
          featuredIMG,
          status,
          userID,
          slug,
        }
      })
    } catch (error) {
      console.log(`updateRow Error: ${error}`);
      return error
    }



  }

  // delete post saar
  async deletePost(postId) {

    try {
      await this.databases.deleteRow({
        tableId: conf.appwriteTableId,
        databaseId: conf.appwriteDbId,
        rowId: postId
      },

      )
      return true
    } catch (error) {
      console.log(`deletePost Error: ${error}`);
      return false
    }
  }

  // get post saar
  async getPost(rowId) {
    try {
     const res = await this.databases.getRow({
        databaseId: conf.appwriteDbId,
        tableId: conf.appwriteTableId,
        rowId,
      })
      return res
    } catch (error) {
      console.log(`getPost Error: ${error}`);
      return false
    }
  }

  // get post by slug
  async getPostBySlug(slug) {
    try {
      const res = await this.databases.listRows({
        databaseId: conf.appwriteDbId,
        tableId: conf.appwriteTableId,
        queries: [Query.equal('slug', slug)]
      })
      return res.rows[0]
    } catch (error) {
      console.log('GET-POST-BY-SLUG ERROR:', error);
      return error
    }
  }


  // get posts saar
  async listPosts() {
    try {
      return await this.databases.listRows({
        databaseId: conf.appwriteDbId,
        tableId: conf.appwriteTableId,
        queries: [Query.equal('status', true)],
      })
    } catch (error) {
      console.log(`listPosts Error: ${error}`);
      return error

    }
  }

  // upload file saar
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      })
    } catch (error) {
      console.log(`uploadFile Error: ${error}`);
      return error
    }
  }

  // delete post saar 
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      })


    } catch (error) {
      console.log(`deletePost Error: ${error}`);
      return false

    }
  }

  // get file preview 
  async getFilePreview(fileId) {
    try {
      let file = this.storage.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId: fileId
      })

      return file

    } catch (error) {
      console.log(`getFilePreview Error: ${error}`);
      return false
    }
  }
}




export const dataBase = new Database()