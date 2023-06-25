import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../models/userModel.js'

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use("local-signup",new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const user = await User.findOne({ email: email });
        console.log(user);
        if (user) {
            return done(
            null,
            false,
            req.flash('error_msg','El email ya se encuentra registrado')
        );
        } else {
            const newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            console.log(newUser);
            await newUser.save();
            done(null, newUser);
        }
    }
));

passport.use("local-signin",new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, req.flash('error_msg','No se encontró el usuario'));
        }
        if (!user.comparePassword(password)) {
            return done(
                null,
                false,
                req.flash('error_msg','Contraseña incorrecta')
            );
        }
        return done(null, user);
    }
));
