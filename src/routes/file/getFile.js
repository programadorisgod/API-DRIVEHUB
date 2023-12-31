import { Router } from 'express'
import getFiles, { getFilebyLink, getMiniatures } from '../../controllers/files/getFlies.js'
import getAvatars from '../../controllers/files/getAvatars.js'
import { encryptIdentifier } from '../../helpers/encrypt.js'
import { convertFile } from '../../helpers/convert.js'
import { checkAuth } from '../../middleware/auth/auth.js'

const routerFile = Router()

const path = '/api/files'

routerFile.get(`${path}/unidad/:userName/:directory/:fileName`, getFiles)

routerFile.get(`${path}/unidad/:Default/:fileName`, getMiniatures)
routerFile.get(`${path}/avatars/:fileName`, getAvatars)
routerFile.get(`${path}/getlink`, checkAuth, encryptIdentifier)
routerFile.get(`${path}/open-file`, getFilebyLink)
routerFile.get(`${path}/convert/:Directory/:fileName/:ext`, checkAuth, convertFile)

export default routerFile
