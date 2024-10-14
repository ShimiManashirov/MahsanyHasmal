const fs = require('fs');
const yaml = require('js-yaml');

let config_auth;

// Reading the file
try {
    const fileContents = fs.readFileSync('config.yaml', 'utf8');
    // Loading it as YAML
    config_user = yaml.load(fileContents).USER;
} catch (e) {
    console.error('Error reading or parsing the YAML file:', e);
}

// Exporting the configuration
module.exports = {
    config_user
};