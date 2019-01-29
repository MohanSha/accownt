const MySQL = require('lib/mysql');

/*
	GET /api/user/account
	RETURN
		{
      loggedIn: boolean, message: string, hasPassword: boolean,
      recovered: boolean, email: string
		}
*/
module.exports = async function(req, res) {
  const db = new MySQL();

  try {
    if (!req.session.uid) throw 'Not logged in';

    await db.getConnection();
    const [user] = await db.query(
      `
        SELECT email, IF(password = '', 0, 1) AS hasPassword
        FROM users WHERE id = ?
      `,
      [req.session.uid]
    );
    if (!user) throw 'Could not find user';

    user.recovered = req.session.recovered;
    user.loggedIn = true;
    res.status(200).json(user);
  } catch (err) {
    db.release();
    res.status(400).json({ loggedIn: false, message: err });
  }
};