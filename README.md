# COMMUNITY PLATFORM
## 1 Structure general
- Frontend: Next.js (TypeScript) + TailwindCSS + Markdown Editor
- Backend: NestJS (TypeScript) + Prisma + PostgreSQL
- Realtime: Socket.io / WebSocket Gateway (NestJS)
- Auth: JWT / OAuth
## 2 Features
| Features      |             Description                                                             |
| --------      |               -------                                                               |   
| Auth          |    JWT Register/Login _ OAuth2 Google                                               |
| Post          |    CRUD posts, formatted in Markdown                                                |
| Comment       |    Threaded comments (threaded optional)                                            |
| Vote          |    Upvote/downvote posts or comments                                                |
| Hashtag       |    Parse `#hashtag` from content and link to search page                            |
| Search        |    Full-text search with `PostgreSQL` `tsvector`                                    |
| Realtime      |    Get notified when there is a new comment/vote using WebSocket or socket.io       |

## 3 Packages
### 3.1 Backend
- `@nestjs/passport`, `@nestjs/jwt`, `passport-google-oauth20`
- `@nestjs/websockets`, `socket.io`, `@prisma/client`
- `bcrypt`, `class-validator`, `uuid`
- `nestjs-pino` hoặc `winston – logging`


### API Docs

```markdown
[📘 API Docs](./server/docs/api-doc.md)
