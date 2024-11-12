import { Router } from "express";
import { createUser , getCandidates, getUsers, logIn} from "../controllers/userController";

const router = Router();



router.route("/api/register").post(createUser)
router.route("/api/login").post(logIn)

router.route("/api/candidates").get(getCandidates);
router.route("/api/users").get(getUsers);

export default router;

