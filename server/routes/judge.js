const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/submit', async (req, res) => {
  const { source_code, language_id } = req.body;
  
  // NOTE: For the sake of this Gamified Learning Platform demonstration 
  // without needing an actual RapidAPI Key, we will proxy to a DUMMY execution!
  // In a real project, we would call Judge0 API directly.
  
  try {
    // Simulate compilation/execution delay
    setTimeout(() => {
      // Dummy response based on source code string (if it contains 'console.log("Hello, World!")')
      if (source_code && source_code.includes('Hello, World!')) {
        return res.json({
          status: { id: 3, description: 'Accepted' },
          stdout: "Hello, World!\n",
          compile_output: null
        });
      }

      // Default random accepted or failed
      const rand = Math.random();
      if (rand > 0.3) {
         res.json({
          status: { id: 3, description: 'Accepted' },
          stdout: "Execution random success match!\n",
          compile_output: null
        });
      } else {
         res.json({
          status: { id: 4, description: 'Wrong Answer' },
          stdout: "Output does not match expected output.\n",
          compile_output: null
        });
      }
    }, 1500);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
