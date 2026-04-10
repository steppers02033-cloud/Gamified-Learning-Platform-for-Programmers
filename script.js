// State variables
let userXP = 1250;
let streak = 3;
let hasCompletedChallenge = false;

// DOM Elements
const modal = document.getElementById('challenge-modal');
const codeInput = document.getElementById('code-input');
const consoleOutput = document.getElementById('console-output');
const xpElement = document.getElementById('user-xp');
const toastContainer = document.getElementById('toast-container');

// Open the Challenge Modal
function openChallenge() {
    modal.classList.remove('hidden');
    // Basic animation to reset code if they re-open and haven't won
    if (!hasCompletedChallenge) {
        consoleOutput.className = 'console';
        consoleOutput.innerText = '> System standing by...';
    }
}

// Close Modal
function closeChallenge() {
    modal.classList.add('hidden');
}

// Simulate running the code
function runCode() {
    const code = codeInput.value;
    
    // Simple mock evaluation
    consoleOutput.innerText = '> Running diagnostics...\n';

    setTimeout(() => {
        // If the user fixes the loop by replacing `countdown = countdown;` with `countdown--;` or `countdown -= 1;`
        if (code.includes('countdown--') || code.includes('countdown -= 1') || code.includes('countdown = countdown - 1')) {
            consoleOutput.innerText += '> T-Minus 5\n> T-Minus 4\n> T-Minus 3\n> T-Minus 2\n> T-Minus 1\n> IGNITION!\n\n[SUCCESS] Thruster loop fixed. Nav system restored.';
            consoleOutput.className = 'console success';
            
            if (!hasCompletedChallenge) {
                completeQuest();
            }
        } else if (code.includes('countdown = countdown;')) {
            consoleOutput.innerText += '[ERROR] Infinite loop detected... System halting to prevent crash.';
            consoleOutput.className = 'console error';
        } else {
            consoleOutput.innerText += '[ERROR] Syntax or logic error. Thrusters offline.';
            consoleOutput.className = 'console error';
        }
    }, 800);
}

// Handle Quest Completion
function completeQuest() {
    hasCompletedChallenge = true;
    
    // Update XP
    userXP += 200;
    
    // Animate XP Change
    xpElement.classList.add('pulse-glow');
    xpElement.innerHTML = `1,450 XP`;
    
    setTimeout(() => {
        xpElement.classList.remove('pulse-glow');
    }, 2000);

    // Unlock node
    unlockNode();

    // Show Toast
    showToast('Achievement Unlocked!', 'Master Debugger Badge earned. +200 XP', 'fa-award');

    // Automatically close modal after 3 seconds
    setTimeout(() => {
        closeChallenge();
    }, 3000);
}

// Unlock next node in path
function unlockNode() {
    const lockedNode = document.querySelector('.path-node.locked');
    const lockedConnector = document.querySelector('.path-connector.locked');
    
    if (lockedNode) {
        lockedNode.classList.remove('locked');
        lockedNode.querySelector('.node-icon').innerHTML = '<i class="fa-solid fa-play"></i>';
        lockedNode.querySelector('span').innerText = 'Ready to Start';
        lockedNode.classList.add('pulse');
    }

    if (lockedConnector) {
        lockedConnector.classList.remove('locked');
        lockedConnector.classList.add('active');
    }

    // Mark previous active as completed
    const activeNodes = document.querySelectorAll('.path-node.active:not(.locked)');
    if(activeNodes.length > 0) {
        let prevNode = activeNodes[0];
        prevNode.classList.remove('active', 'pulse');
        prevNode.classList.add('completed');
        prevNode.querySelector('.node-icon').innerHTML = '<i class="fa-solid fa-check"></i>';
        prevNode.querySelector('span').innerText = 'Mastered';
        
        let pb = prevNode.querySelector('.progress-bar-bg');
        if(pb) pb.style.display = 'none';
    }
}

// Show Toast Notification
function showToast(title, message, iconClass) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after animation
    setTimeout(() => {
        toast.remove();
    }, 4500);
}

// Initialize tooltips/other setup if necessary
document.addEventListener('DOMContentLoaded', () => {
    // Add pulsing effect to streak tracker if streak > 0
    if (streak > 0) {
        document.getElementById('streak-tracker').classList.add('pulse-glow');
    }
});
