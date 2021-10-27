
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};


exports.AboutUs = (req, res) => {
  res.render('AboutUs', {
    title: 'About Us'
  });
};

exports.TermsOfUse = (req, res) => {
  res.render('TermsOfUse', {
    title: 'Terms Of Use'
  });
};

exports.PrivacyPolicies = (req, res) => {
  res.render('PrivacyPolicies', {
    title: 'Privacy Policies',
    DateEffective: process.env.DATE_OF_START
  });
};