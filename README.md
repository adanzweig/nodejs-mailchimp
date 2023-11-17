# Mailchimp Integration Project

This project is a Node.js application for integrating with the Mailchimp API. It allows users to create a campaign, add a subscriber, and send an email campaign through Mailchimp.

## Features

- Retrieve a list ID from Mailchimp.
- Create an email campaign.
- Add an email address as a subscriber to a list.
- Send the campaign to the list.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js.
- You have a Mailchimp account and have generated an API key.
- You have at least one list created in Mailchimp.

## Installation

To install the Mailchimp Integration Project, follow these steps:

1. Clone the repo:
   ```bash
   git clone https://github.com/adanzweig/nodejs-mailchimp
   ```
2. Navigate to the project directory:
   ```bash
   cd nodejs-mailchimp
   ```
3. Install the necessary packages:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of your project.
2. Add the following environment variables:
   ```
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_REGION=your_mailchimp_datacenter_region
   ```

## Usage

To use the Mailchimp Integration Project, follow these steps:

1. Run the script:
   ```bash
   node index.js
   ```
2. The script will automatically:
   - Retrieve the first list's ID.
   - Create a new campaign.
   - Subscribe a specified email to the campaign.
   - Send the campaign.

## Contributing to Mailchimp Integration Project

To contribute to the Mailchimp Integration Project, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`.
4. Push to the original branch: `git push origin <project_name>/<location>`.
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).