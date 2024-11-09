import express from 'express';
import { user_obj } from '../main.js';
import Cart from '../Products/Cart.js'
import configuration from '../config_reader.js';


const router = express.Router();




/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Log in a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object 
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: A successful login with user object
 *         schema:
 *           type: object
 *           properties:
 *             tamir:
 *               type: string
 *               example: "tamiros!"
 */


router.post('/user/login', async (req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    var user_auth =await user_obj.User_check_auth(username=username,password=password)
    if (user_auth['valid']){
        console.log("got here")
        var user_cart = new Cart(configuration.config_product,user_auth['hash'],user_obj.DB);
        user_obj.users_online[user_auth['hash']] = user_cart;
        return res.status(200).json({ Username: username,User_hash:user_auth['hash']});
    }
    else{
        return res.status(403).json({ Username: username });
    }
});



/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows you to create a new user by providing the necessary information.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         description: User object that contains user information.
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: exampleUser
 *               description: Unique username for the user.
 *             password:
 *               type: string
 *               example: Password123!
 *               description: Password for the user account (should be stored securely).
 *             email:
 *               type: string
 *               example: user@example.com
 *               description: User's email address.
 *             first_name:
 *               type: string
 *               example: John
 *               description: User's first name.
 *             last_name:
 *               type: string
 *               example: Doe
 *               description: User's last name.
 *             birthDate:
 *               type: string
 *               format: date
 *               example: 1990-01-01
 *               description: User's date of birth (in YYYY-MM-DD format).
 *     responses:
 *       201:
 *         description: User created successfully
 *         schema:
 *           $ref: '#/definitions/User'  # Reference to a User definition if available
 *       400:
 *         description: Invalid input, missing required fields
 *       500:
 *         description: Internal server error
 */


router.post('/user/create', (req, res) => {
    console.log(req.body);
    var username = req.body.Username;
    var password = req.body.Password;
    var email = req.body.email;
    var first_name = req.body.firstName;
    var last_name = req.body.lastName;
    var birthDate = req.body.birthDate;
    //req.log('Initalizing user creator!');
    console.log(req.body.username);

    return res.json(user_obj.User_creator(username=username,password=password,email=email,first_name=first_name,
        last_name=last_name,birthDate=birthDate)
    );
})

export default router;