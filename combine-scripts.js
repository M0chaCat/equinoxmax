const fs = require('fs').promises;
const path = require('path');

// Utility function to remove marked lines
function stripTags(code) {
	return code
		.split('\n')
		.filter(line => !line.includes('// @remove-if-meowing'))
		.join('\n');
}

async function combineScripts() {
	try {
		const commandsPath = path.join(__dirname, 'commands.js');
		const openbundlesPath = path.join(__dirname, 'openbundles.js');
		const srcDirPath = path.join(__dirname, 'src'); // Path to the src directory
		const combinedPath = path.join(__dirname, 'combined.js');

		// Read needed files
		const [commandsContent, openbundlesContent] = await Promise.all([
			fs.readFile(commandsPath, 'utf8'),
			fs.readFile(openbundlesPath, 'utf8')
		]);

		// Find all .js files in src/ and sort them alphabetically
		const srcFiles = await fs.readdir(srcDirPath);
		const jsFiles = srcFiles.filter(file => file.endsWith('.js')).sort();

		// Read content of all .js files in src/
		const srcContents = await Promise.all(jsFiles.map(file =>
			fs.readFile(path.join(srcDirPath, file), 'utf8')
		));

		// Clean tags
		const cleanedCommands = stripTags(commandsContent);
		const cleanedOpenbundles = stripTags(openbundlesContent);

		let srcCombinedContent = '';
		for (let i = 0; i < jsFiles.length; i++) {
			const fileName = jsFiles[i];
			const fileContent = srcContents[i];
			const cleanedContent = stripTags(fileContent);
			srcCombinedContent += `\n// ${fileName}\n${cleanedContent}\n`;
		}

		const combinedContent = `
        document.addEventListener("DOMContentLoaded", function() {
            // commands.js
            ${cleanedCommands}

            // openbundles.js
            ${cleanedOpenbundles}

            // Files from src/ (alphabetical order)
            ${srcCombinedContent}
        });
        `;

		await fs.writeFile(combinedPath, combinedContent, 'utf8');
		console.log('Scripts combined (no obfuscation, no userCommands.js).');
	} catch (error) {
		console.error('Error combining scripts:', error.message);
	}
}

combineScripts();
