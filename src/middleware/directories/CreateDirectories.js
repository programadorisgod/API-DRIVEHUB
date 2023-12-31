import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { httpError } from '../../helpers/handleError.js'
import { error } from 'node:console'
/** Usamos el fileURLToPath para convertir la url en una ruta de archivo */

/**
 * This function creates a directory with a given name
 * in a specified path.
 * @param req - The request object represents the HTTP
 * request that is sent by the client to the server. It
 * contains information about the request, such as the
 * URL, headers, and body.
 * @param res - The `res` parameter is the response
 * object that is used to send the response back to the
 * client. It contains methods and properties that
 * allow you to set the status code, headers, and body
 * of the response.
 * @param next - `next` is a function that is called to
 * pass control to the next middleware function in the
 * stack. It is typically used to chain multiple
 * middleware functions together to handle a request.
 * If an error occurs in the current middleware
 * function, it can call `next` with an error object to
 * skip to the
 * @returns the result of calling the `next()`
 * function, which is used to pass control to the next
 * middleware function in the stack. If the `req.body`
 * object is not empty, the function creates a
 * directory with the name specified in the
 * `nameDirectorio` property of the request body. If
 * the creation of the directory is successful, the
 * function calls `next()` to pass control
 */

export const createFile = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const { nameDirectory } = req.body
      /** unimos la ruta con el directorio en el que estemos, nos devolvemos y accedemos a la raiz  */
      const route = path.join(process.cwd(), `/unidad/${nameDirectory.trim()}`)

      await mkdir(route, { recursive: true })
      // pasamos a la siguiente peticion
      return next()
    }
    return next()
  } catch (error) {
    console.log(error)
    httpError(error, res)
  }
}

export const createDirectory = async (nameDirectory) => {
  try {
    const route = path.join(process.cwd(), `/unidad/${nameDirectory.trim()}`)
    const routeMiniature = path.join(process.cwd(), `/unidad/${nameDirectory.trim()}/gallery`)
    await mkdir(route, { recursive: true })
    await mkdir(routeMiniature, { recursive: true })
  } catch (s) {
    console.log(error)
  }
}
