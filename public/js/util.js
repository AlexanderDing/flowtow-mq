/*
 *
 * Module: util.js
 * < short description: This module implements the utility functions, mainly helps acheveing desired url and acions respectively.>
 *
 * Student Name: Zhixu Ding
 * Student Number: xxxxxxxx
 *
 */

export {splitHash};
// splitHash - given a hash path like "#!/people/2" 
//   return an object with properties `path` ("people") and `id` (2)
function splitHash(hash) {

    const regex = "#!/([^/]*)/?(.*)?";
    const match = hash.match(regex);

    if (match) {

        return {

            path: match[1],
            id: match[2]

        }

    } else {

        return { path: "" }

    }

}

