/**
 * export all APIs
 */

import comment from "./comment";
import githuboauth from "./githuboauth";
import hottopics from "./hottopics";
import loginout from "./login";
import notification from "./notification";
import publish from "./publish";
import question from "./question";
import upload from "./uploadfile";

export default {
  question,
  publish,
  comment,
  notification,
  loginout,
  githuboauth,
  hottopics,
  upload
}
