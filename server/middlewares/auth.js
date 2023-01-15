import jwt from "jsonwebtoken";

const verifyToken = async (res, req, next) => {
   try {
      let token = req.header("Authorization");

      if (!token) {
         return res.status(403).send("Access Denied");
      }

      //   Get the jwt token only
      if (token.startWith("Bearer ")) {
         token = token.slice(7, token.length).trimLeft();
      }

      //   Verify user
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export { verifyToken };