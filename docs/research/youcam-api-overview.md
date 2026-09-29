# YouCam / Perfect Corp API Overview

Research notes for Discover (Agent 2). Prefer official sources; no secrets.

**Sources:** [Devpost](https://youcam-api-skin-ai-ecommerce.devpost.com/), [Rules](https://youcam-api-skin-ai-ecommerce.devpost.com/rules), [AI API portal](https://yce.perfectcorp.com/ai-api), [Docs home](https://docs.perfectcorp.com/), [Quick start](https://docs.perfectcorp.com/develop/quick_start_guide), [MCP](https://docs.perfectcorp.com/develop/mcp), [Skin Analysis v2.1](https://docs.perfectcorp.com/reference/ai_skin_analysis/v2.1), [Clothes VTO](https://docs.perfectcorp.com/reference/ai_clothes), [Skin Simulation](https://docs.perfectcorp.com/reference/ai_skin_simulation/section/overview/integration-guide).

## Access & auth

| Item | Detail |
| --- | --- |
| Signup | https://yce.perfectcorp.com/ai-api (also yce.makeupar.com) |
| API console / keys | https://yce.perfectcorp.com/api-console/en/api-keys/ |
| Base URL | `https://yce-api-01.makeupar.com` |
| Auth (V2) | `Authorization: Bearer <API_KEY>` — no separate auth call |
| Hackathon units | 1,000 free units via Devpost redeem code (90 days); optional +500/platform social bonus (max 2 platforms) |
| File retention | Uploaded pictures deleted in 24 hours (portal claim); task results queryable ~24h |

## Common async pattern

1. Upload via `POST /s2s/v2.0/file` **or** pass public `src_file_url`
2. `POST` task endpoint → `task_id`
3. Poll `GET` task status (~10s) or webhook where supported → `success` / `error`
4. Read result URL / JSON

Platforms: REST drops into **web, iOS, Android, ecommerce, mini-programs**. Optional **JS Camera Kit** modes (`skincare`, `hdskincare`, `makeup`, `comprehensive`, jewelry capture modes, etc.). Native **MCP** servers: beauty, fashion, creators.

## Hackathon-relevant capabilities

### Skin AI (primary track)

| API | Endpoint (representative) | Notes |
| --- | --- | --- |
| Skin Analysis v2.1 | `/s2s/v2.1/task/skin-analysis` | ~14+ concerns; HD vs SD actions (do not mix); format `json` or `zip` (score_info + overlays); max output ~2560px |
| Skin Simulation | `/s2s/v2.0/task/skin-simulation` | Before/after intensity per concern (wrinkle, pores, radiance, acne, etc.) |
| Fitzpatrick | Beauty MCP / dedicated API | Types I–VI |
| Facial Color Tones | Beauty MCP | Skin/eye/brow/lip/hair colors → palettes |
| Face Attributes & Ratio | Beauty MCP | 50+ attributes, 11 ratios |

HD concern examples: wrinkles, pores, texture, acne, oiliness, radiance, moisture, dark circles, eye bags, firmness, age spots, redness, tear trough, skin type (T/U/whole).

### eCommerce VTO (primary track)

| API | Endpoint (representative) | Notes |
| --- | --- | --- |
| Clothes VTO v4 | `/s2s/v2.0/task/cloth-v4` | Categories: full/upper/lower/shoes/auto/**outer**; 2 units/image (V2/V3 docs); single person; strict pose/ref specs |
| Makeup VTO | `/s2s/v2.0/task/makeup-vto` | 13 makeup categories |
| Look VTO | `/s2s/v2.0/task/look-vto` | Full looks via `template_id` |
| Hair / nails / lenses / jewelry / bags / hats / scarves / watches | Various | Fashion + Beauty MCP catalogs |

## Limitations & reliability risks

- **Async latency** — poll loops; demo UX must handle waiting.
- **Strict image specs** — clothes/skin fail on pose, multi-person, size, NSFW, bad refs.
- **Units burn** — clothes ~2 units/try-on; multi-API flows (analysis + simulation + VTO) consume fast against 1,000 units.
- **Not real-time AR video** for all features — many are photo→task→result (makeup claims AR/AI; clothes is generative photo edit).
- **India region** — separate ToS/link on Devpost; confirm if entrant is India-based.
- **API key secret** — never commit; server-side proxy recommended for web demos.

## Agentic / MCP angle

Official MCP exposes `AI_Skin_Analysis`, `AI_Skin_simulation`, clothes/fashion tools, `Get_Feature_Cost`, task status — useful for agent workflows judges called out on Devpost. Product can use REST in app + agent orchestration without requiring judges to use MCP.
