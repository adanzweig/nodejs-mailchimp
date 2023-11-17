// Load environment variables from .env file
require('dotenv').config();
const axios = require('axios');

// Function to retrieve the first list's ID from Mailchimp
async function getLists() {
    try {
        const url = `https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0/lists`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `apiKey ${process.env.MAILCHIMP_API_KEY}`
            }
        });
        // Return the ID of the first list
        return response.data.lists[0].id;
    } catch (error) {
        console.error('Error', error);
    }
}

// Function to create a Mailchimp campaign
async function createCampaign(listId, subject, fromName, replyTo, message) {
    try {
        const url = `https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0/campaigns`;
        // Setting up the campaign data
        const data = {
            type: 'regular',
            settings: {
                subject_line: subject,
                from_name: fromName,
                reply_to: replyTo
            },
            recipients: {
                list_id: listId
            }
        };

        // Creating the campaign
        const campaignResponse = await axios.post(url, data, {
            headers: { 'Authorization': `apiKey ${process.env.MAILCHIMP_API_KEY}` }
        });

        const campaignId = campaignResponse.data.id;

        // Setting the content of the campaign
        const contentUrl = `${url}/${campaignId}/content`;
        const contentData = { html: message };

        await axios.put(contentUrl, contentData, {
            headers: { 'Authorization': `apiKey ${process.env.MAILCHIMP_API_KEY}` }
        });

        console.log('Campaign created');

        return campaignId;
    } catch (error) {
        console.error('error', error);
    }
}

// Function to subscribe an email to a campaign
async function subscribeEmailToCampaign(campaignId, email) {
    try {
        const url = `https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0/campaigns/${campaignId}`;

        // Retrieve the list associated with the campaign
        const list = await axios.get(url, {
            headers: { 'Authorization': `apiKey ${process.env.MAILCHIMP_API_KEY}` }
        });

        const listId = list.data.recipients.list_id;

        const subscribeUrl = `https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0/lists/${listId}/members`;
        const subscriberData = { email_address: email, status: 'subscribed' };

        // Add the subscriber to the list
        const subscribeResponse = await axios.post(subscribeUrl, subscriberData, {
            headers: { 'Authorization': `apiKey ${process.env.MAILCHIMP_API_KEY}` }
        });

        console.log('Subscriber added', subscribeResponse.data);
    } catch (error) {
        console.error('error', error);
    }
}

// Function to send the campaign
async function sendCampaign(campaignId) {
    try {
        await axios.post(`https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`, {}, {
            headers: { 'Authorization': `apiKey ${process.env.MAILCHIMP_API_KEY}` }
        });
        console.log('Campaign sent');
    } catch (error) {
        console.error('Error', error);
    }
}

// Main execution
(async () => {
    const listId = await getLists(); // Retrieve the first list's ID
    if (listId) {
        const campaignId = await createCampaign(listId, 'Coding With Ado test email', 'Ado', 'ado@example.com', 'Hello World!');
        if (campaignId) {
            await subscribeEmailToCampaign(campaignId, 'ado@example.com'); // Subscribe an email to the campaign
            await sendCampaign(campaignId); // Send the campaign
        }
    }
})();
