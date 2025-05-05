# Git Notes

| Description                                                | Commands                                   |
| ---------------------------------------------------------- | ------------------------------------------ |
| configure name                                             | `git config --global "[username]"`         |
| configure email                                            | `git config --global "[email address]"`    |
| Initiate an empty repository                               | `git init`                                 |
| Show modified files in working directory,staged for commit | `git status`                               |
| Adding files to staging area                               | `git add .` or `git add [filename]`        |
| Restore staged files                                       | `git restore --staged filename`            |
| Commit your staged content                                 | `git commit -m "[commit message]"`         |
| View commit history                                        | `git log`                                  |
| Restore to a previous commit                               | ` git reset [commit-hash]`                 |
| Restore the previous commit code                           | ` git cherry-pick [commit-hash]`           |
| Temporary Commit(save modified and staged changes)         | `git stash`                                |
| Get stashed files back to staging area                     | `git stash pop`                            |
| Remove stashed files                                       | `git stash clear`                          |
| Adding github repo origin                                  | `git remote add origin [github-repo-link]` |
| Show all the URL's attached                                | `git remote -v`                            |
| Pull repository from github                                | `git pull origin main`                     |

## Working with branch
* remember to add new branches for every feature to provide readability

| **Description**                                           | **Commands**                                |
| --------------------------------------------------------- | ------------------------------------------- |
| new branch creted (head is pointing to the new branch)    | `git branch [branch name]`                  |
| into the created branch                                   | `git checkout [branch name]`                |
| merge new branch to main                                  | `git merge [branch name]`                   |
| **Working with open source projects (pull requests)`**                                                  | 
| cloning the repo (from your url)                          | `git clone [url]`                           |
| where you forked                                          | `git remote add upstream [url]`             |
| fetch all the commits made to the branch                  | `git fetch --all --prune`                   |
| reset the code in your local branch to match the commits                                                | 
| with the main branch                                      | `git reset -hard --upstream/main`           |
| to get the code of another branch to your main            | `git pull upstream main`                    | 
| merging multiple commits to single commit                                                               |
| (pick/s all will merge to above pick)                     | `git rebase -i [commit-hash]`               |


### Github Video link : https://youtu.be/apGV9Kg7ics?si=tvDMfUpHO5gb-J4Z
