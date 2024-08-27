function generateDormerFields() {
    const numDormers = document.getElementById('numDormers').value;
    const dormersGroup = document.getElementById('dormersGroup');

    // Clear any existing fields
    dormersGroup.innerHTML = '';

    for (let i = 1; i <= numDormers; i++) {
        // Create a container for each dormer's fields
        const dormerContainer = document.createElement('div');
        dormerContainer.className = 'dormer-container';
        dormerContainer.style.marginBottom = '20px'; // Adds spacing between dormer fields

        // Add dormer location field
        dormerContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <label for="dormer${i}Location">Dormer ${i} location:</label>
                <input type="text" id="dormer${i}Location" placeholder="Location for Dormer ${i}">
            </div>
        `;

        // Add windows field
        dormerContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <input type="checkbox" id="dormer${i}Windows" onclick="toggleEditableField('dormer${i}WindowsDetails', this)">
                <label for="dormer${i}Windows">Windows</label>
                <input type="text" id="dormer${i}WindowsDetails" class="hidden" placeholder="Additional details for Windows">
            </div>
        `;

        // Add trim field
        dormerContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <input type="checkbox" id="dormer${i}Trim" onclick="toggleEditableField('dormer${i}TrimDetails', this)">
                <label for="dormer${i}Trim">Trim</label>
                <input type="text" id="dormer${i}TrimDetails" class="hidden" placeholder="Additional details for Trim">
            </div>
        `;

        // Add light blocks field
        dormerContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <input type="checkbox" id="dormer${i}LightBlocks" onclick="toggleEditableField('dormer${i}LightBlocksDetails', this)">
                <label for="dormer${i}LightBlocks">Light Blocks</label>
                <input type="text" id="dormer${i}LightBlocksDetails" class="hidden" placeholder="Additional details for Light Blocks">
            </div>
        `;

        // Add electrical notes field
        dormerContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <input type="checkbox" id="dormer${i}ElectricalNotes" onclick="toggleEditableField('dormer${i}ElectricalNotesDetails', this)">
                <label for="dormer${i}ElectricalNotes">Electrical Notes</label>
                <input type="text" id="dormer${i}ElectricalNotesDetails" class="hidden" placeholder="Additional details for Electrical Notes">
            </div>
        `;

        // Add exclusion field
        dormerContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <label for="dormer${i}Exclusion">Exclusion:</label>
                <input type="text" id="dormer${i}Exclusion" placeholder="Exclusion details for Dormer ${i}">
            </div>
        `;

        dormersGroup.appendChild(dormerContainer);
    }
}

function toggleEditableField(fieldId, checkbox) {
    const field = document.getElementById(fieldId);
    if (checkbox.checked) {
        field.classList.remove('hidden');
    } else {
        field.classList.add('hidden');
        field.value = ''; // Clear the field when hidden
    }
}

function generateSummary() {
    let summaryText = '';

    // Handle entire house specifications
    const houseSpecElements = document.querySelectorAll('#houseSpecs .form-group');
    houseSpecElements.forEach(group => {
        const checkbox = group.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const label = group.querySelector('label').innerText.trim();
            const details = group.querySelector('textarea') ? group.querySelector('textarea').value.trim() : '';
            summaryText += `- ${label}${details ? `: ${details}` : ''}\n`;
        }
    });

    // Handle sections of the house
    const sectionSpecElements = document.querySelectorAll('#sectionSpecs .form-group');
    sectionSpecElements.forEach(group => {
        const checkbox = group.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const label = group.querySelector('label').innerText.trim();
            const details = group.querySelector('input[type="text"]') ? group.querySelector('input[type="text"]').value.trim() : '';
            const textarea = group.querySelector('textarea') ? group.querySelector('textarea').value.trim() : '';
            summaryText += `- ${label}${details ? `: ${details}` : ''}${textarea ? `: ${textarea}` : ''}\n`;
        }
    });

    // Handle dormer sections
    const numDormers = document.getElementById('numDormers').value;
    for (let i = 1; i <= numDormers; i++) {
        const location = document.getElementById(`dormer${i}Location`).value;
        const windows = document.getElementById(`dormer${i}Windows`).checked ? document.getElementById(`dormer${i}WindowsDetails`).value : 'N/A';
        const trim = document.getElementById(`dormer${i}Trim`).checked ? document.getElementById(`dormer${i}TrimDetails`).value : 'N/A';
        const lightBlocks = document.getElementById(`dormer${i}LightBlocks`).checked ? document.getElementById(`dormer${i}LightBlocksDetails`).value : 'N/A';
        const electricalNotes = document.getElementById(`dormer${i}ElectricalNotes`).checked ? document.getElementById(`dormer${i}ElectricalNotesDetails`).value : 'N/A';
        const exclusion = document.getElementById(`dormer${i}Exclusion`).value;

        summaryText += `\nDormer location: ${location}\n`;
        summaryText += `- Windows: ${windows}\n`;
        summaryText += `- Trim: ${trim}\n`;
        summaryText += `- Light Blocks: ${lightBlocks}\n`;
        summaryText += `- Electrical Notes: ${electricalNotes}\n`;
        summaryText += `Exclusion: ${exclusion}\n`;
    }

    // Handle Special Notes
    const specialNotes = document.querySelector('#specialNotes').value.trim();
    if (specialNotes) {
        summaryText += `\nSpecial Notes:\n${specialNotes}\n`;
    }

    // Handle Exclusions
    const exclusions = document.querySelector('#exclusions').value.trim();
    if (exclusions) {
        summaryText += `\nExclusions:\n${exclusions}\n`;
    }

    document.getElementById('summaryText').value = summaryText.trim();
}

function copySummary() {
    const summaryText = document.getElementById('summaryText');
    summaryText.select();
    document.execCommand('copy');
}