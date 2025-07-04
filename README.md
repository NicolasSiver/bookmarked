# <img src='./public/icon32.png' height='32' alt='Bookmarked Icon' style="display: flex;align-items: center;"/> Bookmarked

![CI](https://github.com/NicolasSiver/bookmarked/actions/workflows/nodejs-test.yml/badge.svg?branch=main)

> Notes: There are many extensions dedicated to bookmark and tab management. This is my simplified version.

## What is Bookmarked?

Google Chrome extension to manage bookmarks as a part of the new tab experience.

![Screenshot](screenshot.png)

## Background and Motivation

A few years ago, I discovered an exciting take on bookmark organization via a new tab experience in Google Chrome. It was Toby. It was a straightforward extension around tab management. One feature that appealed to me was the ability to organize tabs/bookmarks into collections where all that data would synchronize between work and personal environments. Developers actively supported the extension, and functionality would grow. It started to have more and more features that I did not need, and those features began to compete for the space on the screen and get into valuable experience for tab management via collections. At some point, a requirement was added for a personal account to log into Toby as a service. All of that started diminishing the value of the straightforward feature I liked. A few months ago, an announcement was made that the free plan would become a new type of account with limitations on how many bookmarks you can have in the collections. This is where it started to become a deal breaker.

I think it's possible to have that initial functionality without any additional burden Toby had to aggregate across multiple years of development. This is the idea behind the Bookmarked extension.

## Goals

- Simple
- Lightweight
- New tab experience
- Data persistence across multiple devices
- Visually appealing
- Google Chrome only

## Roadmap and Aspirations

- [x] Basic collection flow
- [x] Create Google Chrome Dev Account and publish the extension
- [x] Data persistence
- [x] Multi-device data syncronization
- [x] Bookmarks: change order
- [x] Data persistence: utilize 8 KB limit for a single key (Compression Streams API)
- [x] Themes (Dark / Light)
- [x] Search
- [ ] Bookmark management: Spaces
- [ ] Data migration from Toby
- [ ] Highlight already opened bookmarks
- [ ] Bookmarks: color-coding
- [ ] Sync: Google Drive API

## Small things

- [x] Add storage tracker into the settings
- [x] Add settings as a wide slider
- [x] Support "Enter" button for confirmation of inputs
- [ ] Add icons to the main menu
- [ ] URL validation
- [ ] Popup - fast delete?
- [ ] Notifications for pivotal async operations and errors
- [ ] Collapse collections with persistence
- [ ] Custom colors for spaces
- [ ] Feedback when space is applied and no collections are shown
- [ ] Hotkeys
