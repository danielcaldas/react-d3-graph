# Change Log

## [2.5.0](https://github.com/danielcaldas/react-d3-graph/tree/2.5.0)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.4.1...2.5.0)

**Implemented enhancements:**

-   make node.size accept both height and width [\#336](https://github.com/danielcaldas/react-d3-graph/issues/336)

**Fixed bugs:**

-   Passing an empty data.links array throws a warning [\#323](https://github.com/danielcaldas/react-d3-graph/issues/323)
-   renderLabel params are not working for single node [\#322](https://github.com/danielcaldas/react-d3-graph/issues/322)
-   The release version does not contain some fixes [\#314](https://github.com/danielcaldas/react-d3-graph/issues/314)

**Closed issues:**

-   Docs missing collapsible sandbox example [\#337](https://github.com/danielcaldas/react-d3-graph/issues/337)
-   Multiple Edges between 2 nodes [\#335](https://github.com/danielcaldas/react-d3-graph/issues/335)
-   Ability to display node labels in different positions relative to the node center [\#299](https://github.com/danielcaldas/react-d3-graph/issues/299)

**Merged pull requests:**

-   Added ability to configure a node's width and height separately [\#342](https://github.com/danielcaldas/react-d3-graph/pull/342) ([terahn](https://github.com/terahn))
-   Bump websocket-extensions from 0.1.3 to 0.1.4 [\#331](https://github.com/danielcaldas/react-d3-graph/pull/331) ([dependabot[bot]](https://github.com/apps/dependabot))
-   Misc improvements cleanup from previous PRs [\#327](https://github.com/danielcaldas/react-d3-graph/pull/327) ([danielcaldas](https://github.com/danielcaldas))
-   Add GitHub Actions Workflow for library CI [\#326](https://github.com/danielcaldas/react-d3-graph/pull/326) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/misc documentation sandbox improvements [\#315](https://github.com/danielcaldas/react-d3-graph/pull/315) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/initial zoom [\#289](https://github.com/danielcaldas/react-d3-graph/pull/289) ([Morta1](https://github.com/Morta1))
-   Reorganizing the computation of arrows and links for circle nodes [\#271](https://github.com/danielcaldas/react-d3-graph/pull/271) ([antoninklopp](https://github.com/antoninklopp))

## [2.4.1](https://github.com/danielcaldas/react-d3-graph/tree/2.4.1)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.3.0...2.4.1)

**Special announcement:**

-   After https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42240 being merged thanks to @hrngoode `react-d3-graph` is not available on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) in case you use TypeScript. 🎉 🎉 🎉

**Implemented enhancements:**

-   Make link end marker's width and height configurable [\#238](https://github.com/danielcaldas/react-d3-graph/issues/238)
-   Avoid flashing graph when drag&drop node [\#237](https://github.com/danielcaldas/react-d3-graph/issues/237)
-   Make `node.renderLabel` available at node level [\#192](https://github.com/danielcaldas/react-d3-graph/issues/192)

**Sandbox & Documentation**

-   Anchored links **per each configuration property** starting on version 2.4.0
-   Deleting node is sandbox breaks the demo if the number of nodes reaches 0 [\#287](https://github.com/danielcaldas/react-d3-graph/issues/287)

**Fixed bugs:**

-   Collapsible node with no links errors out on click [\#292](https://github.com/danielcaldas/react-d3-graph/issues/292)
-   Deleting node is sandbox breaks the demo if the number of nodes reaches 0 [\#287](https://github.com/danielcaldas/react-d3-graph/issues/287)
-   onNodePositionChange doesn't always trigger [\#264](https://github.com/danielcaldas/react-d3-graph/issues/264)
-   Custom node example is not loading on the sandbox [\#252](https://github.com/danielcaldas/react-d3-graph/issues/252)
-   Not passing data.links breaks the library while it should throw a custom error [\#211](https://github.com/danielcaldas/react-d3-graph/issues/211)

**Closed issues:**

-   automaticRearrangeAfterDropNode - play button from live demo [\#261](https://github.com/danielcaldas/react-d3-graph/issues/261)
-   Improve live example by replacing all window.alerts by toasts or other non blocking alerts [\#241](https://github.com/danielcaldas/react-d3-graph/issues/241)
-   Add tooltips to sandbox playground configs [\#239](https://github.com/danielcaldas/react-d3-graph/issues/239)
-   Make use of jest `.toMatchSnapshot` in library unit tests [\#236](https://github.com/danielcaldas/react-d3-graph/issues/236)
-   link.type only can make effect in global [\#234](https://github.com/danielcaldas/react-d3-graph/issues/234)
-   Node drag and drop methods [\#204](https://github.com/danielcaldas/react-d3-graph/issues/204)

**Merged pull requests:**

-   Chore: Misc bug bix travis node upgrade [\#305](https://github.com/danielcaldas/react-d3-graph/pull/305) ([danielcaldas](https://github.com/danielcaldas))
-   Fix error on collapse for node with no links [\#293](https://github.com/danielcaldas/react-d3-graph/pull/293) ([vsramanujan](https://github.com/vsramanujan))
-   Stop node removal when node count reaches 1 [\#288](https://github.com/danielcaldas/react-d3-graph/pull/288) ([pushpinder107](https://github.com/pushpinder107))
-   Docs: Added missing event to \<Graph /\> [\#286](https://github.com/danielcaldas/react-d3-graph/pull/286) ([mknepprath](https://github.com/mknepprath))
-   Fix typos [\#279](https://github.com/danielcaldas/react-d3-graph/pull/279) ([pushpinder107](https://github.com/pushpinder107))
-   Adding a parameter in config to be able to disable link force [\#278](https://github.com/danielcaldas/react-d3-graph/pull/278) ([antoninklopp](https://github.com/antoninklopp))
-   node_label changes enabled local param for renderLabel [\#267](https://github.com/danielcaldas/react-d3-graph/pull/267) ([gopherine](https://github.com/gopherine))
-   fix/remove delta validation for onNodePositionChange [\#266](https://github.com/danielcaldas/react-d3-graph/pull/266) ([Kav91](https://github.com/Kav91))
-   Update docs for automaticRearrangeAfterDropNode prop [\#262](https://github.com/danielcaldas/react-d3-graph/pull/262) ([danielcaldas](https://github.com/danielcaldas))
-   Bug/custom nodes sandbox additions [\#256](https://github.com/danielcaldas/react-d3-graph/pull/256) ([danielcaldas](https://github.com/danielcaldas))
-   Pass the event of onClickGraph to the prop [\#254](https://github.com/danielcaldas/react-d3-graph/pull/254) ([jameskfry](https://github.com/jameskfry))
-   local link type added [\#247](https://github.com/danielcaldas/react-d3-graph/pull/247) ([gopherine](https://github.com/gopherine))
-   Fix: data links error [\#246](https://github.com/danielcaldas/react-d3-graph/pull/246) ([mecm1993](https://github.com/mecm1993))
-   Making Marker height and width configurable [\#245](https://github.com/danielcaldas/react-d3-graph/pull/245) ([SachinVarghese](https://github.com/SachinVarghese))
-   Feature/better sandbox alerts [\#244](https://github.com/danielcaldas/react-d3-graph/pull/244) ([danielcaldas](https://github.com/danielcaldas))
-   Fix: Update test with .toMatchSnapshot to test UI [\#243](https://github.com/danielcaldas/react-d3-graph/pull/243) ([nguyenami](https://github.com/nguyenami))
-   Prevent graph flashing when dragging and dropping nodes [\#242](https://github.com/danielcaldas/react-d3-graph/pull/242) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/sandbox generate tooltips from jsdoc [\#240](https://github.com/danielcaldas/react-d3-graph/pull/240) ([danielcaldas](https://github.com/danielcaldas))

## [2.4.0](https://github.com/danielcaldas/react-d3-graph/tree/2.4.0)

⚠️ This distribution is not valid, it not up to date with the changes described in its previous _CHANGELOG_.md. **Please use version 2.4.1 of this library instead**. Issue reported in [The release version does not contain some fixes #314](https://github.com/danielcaldas/react-d3-graph/issues/314).

## [2.3.0](https://github.com/danielcaldas/react-d3-graph/tree/2.3.0)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.2.0...2.3.0)

**Merged pull requests:**

-   Misc refactor improvements [\#231](https://github.com/danielcaldas/react-d3-graph/pull/231) ([danielcaldas](https://github.com/danielcaldas))
-   onNodePositionChange [\#228](https://github.com/danielcaldas/react-d3-graph/pull/228) ([danielcaldas](https://github.com/danielcaldas))
-   Upgrade to babel7 [\#225](https://github.com/danielcaldas/react-d3-graph/pull/225) ([danielcaldas](https://github.com/danielcaldas))

## [2.2.0](https://github.com/danielcaldas/react-d3-graph/tree/2.2.0)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.1.0...2.2.0)

**Fixed bugs:**

-   Drag&Drop does not work for leaf nodes after collapsing and _"uncollapsing"_ [\#223](https://github.com/danielcaldas/react-d3-graph/issues/223)
-   \[Sandbox\] Fail to remove links / nodes in the live demo example [\#212](https://github.com/danielcaldas/react-d3-graph/issues/212)
-   Error clicking nodes composed of `mdi-react` icons [\#201](https://github.com/danielcaldas/react-d3-graph/issues/201)

**Closed issues:**

-   link.renderLabel is not true by default [\#210](https://github.com/danielcaldas/react-d3-graph/issues/210)
-   onDoubleClickNode [\#194](https://github.com/danielcaldas/react-d3-graph/issues/194)

**Merged pull requests:**

-   Fix uncollapsing nodes causes entire graph to be dragged [\#224](https://github.com/danielcaldas/react-d3-graph/pull/224) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/allow custom properties to pass on update for links [\#220](https://github.com/danielcaldas/react-d3-graph/pull/220) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/new config static graph with drag and drop [\#217](https://github.com/danielcaldas/react-d3-graph/pull/217) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/Fail to remove links / nodes in the live demo [\#216](https://github.com/danielcaldas/react-d3-graph/pull/216) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/allow pass function in link.label property [\#215](https://github.com/danielcaldas/react-d3-graph/pull/215) ([danielcaldas](https://github.com/danielcaldas))
-   Run CI on node 10.14.0 \(additionally\) [\#214](https://github.com/danielcaldas/react-d3-graph/pull/214) ([danielcaldas](https://github.com/danielcaldas))
-   Use setState to set highlightedLink [\#213](https://github.com/danielcaldas/react-d3-graph/pull/213) ([danielcaldas](https://github.com/danielcaldas))

**Chore:**

-   Supporting spread operator for objects. Moving from [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
-   Update [cypress](https://github.com/cypress-io/cypress) from `v2.1.0` to `v.3.4.1`.
-   Use [UNSAFE_componentWillReceiveProps](UNSAFE_componentWillReceiveProps) instead of `componentWillReceiveProps` (TBD: migrate to [static getDerivedStateFromProps(props, state)
    ](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops))

## [2.1.0](https://github.com/danielcaldas/react-d3-graph/tree/2.1.0)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.0.2...2.1.0)

**Fixed bugs:**

-   When using an icon from mdi-react in a node, clicking the node throws an error. [#201](https://github.com/danielcaldas/react-d3-graph/issues/201)

**New features:**

-   **onDoubleClickNode** [#194](https://github.com/danielcaldas/react-d3-graph/issues/194)

## [2.0.2](https://github.com/danielcaldas/react-d3-graph/tree/2.0.2)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.0.1...2.0.2)

**Fixed bugs:**

-   Delete \(remove\) nodes and links from graph [\#183](https://github.com/danielcaldas/react-d3-graph/issues/183)

**Closed issues:**

-   Is there a way to make the graph render consistently? [\#193](https://github.com/danielcaldas/react-d3-graph/issues/193)
-   Addition to readme [\#190](https://github.com/danielcaldas/react-d3-graph/issues/190)

**Merged pull requests:**

-   Update README.md [\#191](https://github.com/danielcaldas/react-d3-graph/pull/191) ([danielcaldas](https://github.com/danielcaldas))
-   Specify links in Graph component update [\#186](https://github.com/danielcaldas/react-d3-graph/pull/186) ([grant37](https://github.com/grant37))

## [2.0.1](https://github.com/danielcaldas/react-d3-graph/tree/2.0.1)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.0.0...2.0.1)

**Fixed bugs:**

-   Links get disappeared while dragging the nodes [\#180](https://github.com/danielcaldas/react-d3-graph/issues/180) Thanks ([kbtganesh](https://github.com/kbtganesh)), ([wendymungovan](https://github.com/wendymungovan)) and ([prateekgoel](https://github.com/prateekgoel)) for reporting

## [2.0.0](https://github.com/danielcaldas/react-d3-graph/tree/2.0.0)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.0.0-rc2...2.0.0)

**Fixed bugs:**

-   Link Colors not used when adding to graph [\#169](https://github.com/danielcaldas/react-d3-graph/issues/169)
-   Node id 0 not set properly [\#160](https://github.com/danielcaldas/react-d3-graph/issues/160)
-   Nodes added or deleted from a graph with nodes in fixed positions will cause issues [\#151](https://github.com/danielcaldas/react-d3-graph/issues/151)
-   Collapsible config option can cause orphaned nodes to not be displayed [\#129](https://github.com/danielcaldas/react-d3-graph/issues/129)

**Closed issues:**

-   Reverse the direction of arrows for "directed" property [\#153](https://github.com/danielcaldas/react-d3-graph/issues/153)
-   viewGenerator key being dropped in config merge [\#142](https://github.com/danielcaldas/react-d3-graph/issues/142)
-   Links labeling [\#47](https://github.com/danielcaldas/react-d3-graph/issues/47)

**Merged pull requests:**

-   Refactor/run lint on sandbox [\#179](https://github.com/danielcaldas/react-d3-graph/pull/179) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/labels on links [\#178](https://github.com/danielcaldas/react-d3-graph/pull/178) ([danielcaldas](https://github.com/danielcaldas))
-   fix: Add link with custom color in existing graph [\#170](https://github.com/danielcaldas/react-d3-graph/pull/170) ([LonelyPrincess](https://github.com/LonelyPrincess))
-   More granular resolution of node and link parameters [\#166](https://github.com/danielcaldas/react-d3-graph/pull/166) ([sauln](https://github.com/sauln))
-   Fix/0 number id edge case [\#161](https://github.com/danielcaldas/react-d3-graph/pull/161) ([danielcaldas](https://github.com/danielcaldas))
-   Update webpack-dev-server and react-dom [\#159](https://github.com/danielcaldas/react-d3-graph/pull/159) ([danielcaldas](https://github.com/danielcaldas))
-   Refactor/split graph helper logic [\#158](https://github.com/danielcaldas/react-d3-graph/pull/158) ([danielcaldas](https://github.com/danielcaldas))
-   Refactor/tooling upgrade [\#157](https://github.com/danielcaldas/react-d3-graph/pull/157) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/linting prettier improvements [\#156](https://github.com/danielcaldas/react-d3-graph/pull/156) ([danielcaldas](https://github.com/danielcaldas))
-   Simplified test folder file structure merging "component" and "snapshot" [\#155](https://github.com/danielcaldas/react-d3-graph/pull/155) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/collapsible orphan nodes and last node [\#154](https://github.com/danielcaldas/react-d3-graph/pull/154) ([danielcaldas](https://github.com/danielcaldas))

## [2.0.0-rc2](https://github.com/danielcaldas/react-d3-graph/tree/2.0.0-rc2)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.0.0-rc1...2.0.0-rc2)

**Implemented enhancements:**

-   Allow nodes to override strokeColor [\#122](https://github.com/danielcaldas/react-d3-graph/issues/122)

**Fixed bugs:**

-   Custom onNodeClick handler not triggering on collapsible nodes [\#136](https://github.com/danielcaldas/react-d3-graph/issues/136)
-   🐛 Global `viewGenerator` not been applied to the nodes [\#130](https://github.com/danielcaldas/react-d3-graph/issues/130)

**Closed issues:**

-   graph constantly re-rendering even when app is idle? [\#145](https://github.com/danielcaldas/react-d3-graph/issues/145)
-   Allow users to pass in a function in node.labelProperty [\#133](https://github.com/danielcaldas/react-d3-graph/issues/133)
-   Drop yarn support for development \(stick to npm only\) [\#127](https://github.com/danielcaldas/react-d3-graph/issues/127)
-   Link mouse cursor property [\#119](https://github.com/danielcaldas/react-d3-graph/issues/119)
-   Center graph on a specific node [\#102](https://github.com/danielcaldas/react-d3-graph/issues/102)
-   Links with directional arrow [\#88](https://github.com/danielcaldas/react-d3-graph/issues/88)

**Merged pull requests:**

-   Fix/right clicks [\#140](https://github.com/danielcaldas/react-d3-graph/pull/140) ([danielcaldas](https://github.com/danielcaldas))
-   Refactor/clean link component [\#139](https://github.com/danielcaldas/react-d3-graph/pull/139) ([danielcaldas](https://github.com/danielcaldas))
-   fix: Trigger custom click handler in collapsible nodes [\#137](https://github.com/danielcaldas/react-d3-graph/pull/137) ([LonelyPrincess](https://github.com/LonelyPrincess))
-   Add Support to pass a function to node.labelProperty [\#135](https://github.com/danielcaldas/react-d3-graph/pull/135) ([dgautsch](https://github.com/dgautsch))
-   Support Development on Windows Machines [\#134](https://github.com/danielcaldas/react-d3-graph/pull/134) ([dgautsch](https://github.com/dgautsch))
-   Feature/directional graph [\#132](https://github.com/danielcaldas/react-d3-graph/pull/132) ([danielcaldas](https://github.com/danielcaldas))
-   Global `viewGenerator` included in default config object [\#131](https://github.com/danielcaldas/react-d3-graph/pull/131) ([LonelyPrincess](https://github.com/LonelyPrincess))
-   Remove Yarn [\#128](https://github.com/danielcaldas/react-d3-graph/pull/128) ([sasalx](https://github.com/sasalx))
-   Feature/right clicking [\#124](https://github.com/danielcaldas/react-d3-graph/pull/124) ([ghardin137](https://github.com/ghardin137))
-   Allow nodes to override strokeColor [\#123](https://github.com/danielcaldas/react-d3-graph/pull/123) ([Andras-Simon](https://github.com/Andras-Simon))
-   fix: \#119 Add mouseCursor prop to \<Link\> [\#120](https://github.com/danielcaldas/react-d3-graph/pull/120) ([kaungmyatlwin](https://github.com/kaungmyatlwin))
-   Add onClick handler to the canvas, for use in eg. unselecting nodes [\#113](https://github.com/danielcaldas/react-d3-graph/pull/113) ([smilykoch](https://github.com/smilykoch))
-   Focus view on a node [\#107](https://github.com/danielcaldas/react-d3-graph/pull/107) ([LonelyPrincess](https://github.com/LonelyPrincess))

## [2.0.0-rc1](https://github.com/danielcaldas/react-d3-graph/tree/2.0.0-rc1)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/2.0.0-rc0...2.0.0-rc1)

**Closed issues:**

-   i want to customise node. is it possible ? [\#90](https://github.com/danielcaldas/react-d3-graph/issues/90)

**Merged pull requests:**

-   Remove snapshoot structures for nodes and links [\#118](https://github.com/danielcaldas/react-d3-graph/pull/118) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/Check for d3 config is updated [\#117](https://github.com/danielcaldas/react-d3-graph/pull/117) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/documentation overall improvements [\#116](https://github.com/danielcaldas/react-d3-graph/pull/116) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/defensive code for curve types [\#115](https://github.com/danielcaldas/react-d3-graph/pull/115) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/graph unnecessary calls to graph forces config [\#114](https://github.com/danielcaldas/react-d3-graph/pull/114) ([danielcaldas](https://github.com/danielcaldas))
-   Customize nodes with JSX views [\#103](https://github.com/danielcaldas/react-d3-graph/pull/103) ([LonelyPrincess](https://github.com/LonelyPrincess))

## [2.0.0-rc0](https://github.com/danielcaldas/react-d3-graph/tree/2.0.0-rc0)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/1.3.0...2.0.0-rc0)

**Implemented enhancements:**

-   Directional links are placed on top of each other [\#89](https://github.com/danielcaldas/react-d3-graph/issues/89)

**Fixed bugs:**

-   Error re-rendering Graph when no `config` prop is set [\#81](https://github.com/danielcaldas/react-d3-graph/issues/81)

**Merged pull requests:**

-   Configurable graph force strength and link length [\#104](https://github.com/danielcaldas/react-d3-graph/pull/104) ([LonelyPrincess](https://github.com/LonelyPrincess))
-   Fix alert message of onClickNode function in README [\#100](https://github.com/danielcaldas/react-d3-graph/pull/100) ([LucienBouletRoblin](https://github.com/LucienBouletRoblin))
-   Fix/dependencies update [\#95](https://github.com/danielcaldas/react-d3-graph/pull/95) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/bump dependencies [\#92](https://github.com/danielcaldas/react-d3-graph/pull/92) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/bend links [\#91](https://github.com/danielcaldas/react-d3-graph/pull/91) ([danielcaldas](https://github.com/danielcaldas))
-   Small improvement in utils/pick [\#87](https://github.com/danielcaldas/react-d3-graph/pull/87) ([danielcaldas](https://github.com/danielcaldas))
-   fix: Graph fails to render without config prop [\#84](https://github.com/danielcaldas/react-d3-graph/pull/84) ([LonelyPrincess](https://github.com/LonelyPrincess))
-   Node Collapse [\#83](https://github.com/danielcaldas/react-d3-graph/pull/83) ([svipatov](https://github.com/svipatov))
-   Added overflow:hidden to container graph area [\#82](https://github.com/danielcaldas/react-d3-graph/pull/82) ([svipatov](https://github.com/svipatov))

## [1.3.0](https://github.com/danielcaldas/react-d3-graph/tree/1.3.0) (2018-06-25)

**NOTE**: This release contains only PR [\#79](https://github.com/danielcaldas/react-d3-graph/pull/79) cherry picked from master.

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/1.2.2...1.3.0)

**Merged pull requests:**

-   Customize color for a link [\#79](https://github.com/danielcaldas/react-d3-graph/pull/79)

## [1.2.2](https://github.com/danielcaldas/react-d3-graph/tree/1.2.2) (2018-05-14)

**NOTE**: This release contains only some minor fixes picked from master. Out of scope of this relase is
PR _Fix/peer dependencies_ [\#70](https://github.com/danielcaldas/react-d3-graph/pull/70) where **react** and
**d3** will pass to the _peerDependencies_ block breaking installs that do not meet the restrictions of
react and d3 versions.

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/1.2.1...1.2.2)

**Fixed bugs:**

-   BUG: NO LINK GETS HIGHLIGHTED WHEN NODE ID IS NON-STIRNG [\#73](https://github.com/danielcaldas/react-d3-graph/issues/73) props to @iamhosseindhv for reporting

**Closed issues:**

-   can the graph nodes and line not stacked [\#58](https://github.com/danielcaldas/react-d3-graph/issues/58)
-   custom add node button [\#57](https://github.com/danielcaldas/react-d3-graph/issues/57)
-   labelProperty not implemented? [\#54](https://github.com/danielcaldas/react-d3-graph/issues/54)
-   BUG: NO LINK GETS HIGHLIGHTED WHEN NODE ID IS NON-STIRNG [\#73](https://github.com/danielcaldas/react-d3-graph/issues/73)

**Merged pull requests:**

-   Fix/mouse over link highlight [\#75](https://github.com/danielcaldas/react-d3-graph/pull/75)
-   Fix/link highlight id number [\#74](https://github.com/danielcaldas/react-d3-graph/pull/74)
-   Feature/move to node 8.11.0 [\#72](https://github.com/danielcaldas/react-d3-graph/pull/72)
-   Refactor/links build [\#69](https://github.com/danielcaldas/react-d3-graph/pull/69)

## [1.2.1](https://github.com/danielcaldas/react-d3-graph/tree/1.2.1) (2018-04-22)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/1.2.0...1.2.1)

**Closed issues:**

-   100% Width/Height of parent element [\#63](https://github.com/danielcaldas/react-d3-graph/issues/63)
-   SVG image for node [\#36](https://github.com/danielcaldas/react-d3-graph/issues/36)

**Merged pull requests:**

-   Move logic from graph component \(highlight updates\) [\#66](https://github.com/danielcaldas/react-d3-graph/pull/66) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/update dependencies [\#65](https://github.com/danielcaldas/react-d3-graph/pull/65) ([danielcaldas](https://github.com/danielcaldas))
-   Add fontColor as a configuration option for node's \<text\> fill property [\#64](https://github.com/danielcaldas/react-d3-graph/pull/64) ([dmmulroy](https://github.com/dmmulroy))

## [1.2.0](https://github.com/danielcaldas/react-d3-graph/tree/1.2.0) (2018-04-01)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/1.0.1...1.2.0)

**Implemented enhancements:**

-   Graph Rerendering [\#51](https://github.com/danielcaldas/react-d3-graph/issues/51)

**Fixed bugs:**

-   Graph Rerendering [\#51](https://github.com/danielcaldas/react-d3-graph/issues/51)

**Merged pull requests:**

-   Improve naming across rd3g codebase [\#62](https://github.com/danielcaldas/react-d3-graph/pull/62) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/update webpack [\#61](https://github.com/danielcaldas/react-d3-graph/pull/61) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/provide svg for nodes [\#60](https://github.com/danielcaldas/react-d3-graph/pull/60) ([danielcaldas](https://github.com/danielcaldas))
-   Fixing a broken link [\#55](https://github.com/danielcaldas/react-d3-graph/pull/55) ([ufo2mstar](https://github.com/ufo2mstar))
-   Feature/add prettier [\#53](https://github.com/danielcaldas/react-d3-graph/pull/53) ([danielcaldas](https://github.com/danielcaldas))

## [1.0.1](https://github.com/danielcaldas/react-d3-graph/tree/1.0.1) (2018-02-18)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/1.0.0...1.0.1)

**Fixed bugs:**

-   Click one node but another one moves [\#41](https://github.com/danielcaldas/react-d3-graph/issues/41)

**Merged pull requests:**

-   Fix/data updates static updates [\#52](https://github.com/danielcaldas/react-d3-graph/pull/52) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/e2e testing [\#50](https://github.com/danielcaldas/react-d3-graph/pull/50) ([danielcaldas](https://github.com/danielcaldas))
-   Refactor/separation of concerns render + logic [\#49](https://github.com/danielcaldas/react-d3-graph/pull/49) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/install [\#45](https://github.com/danielcaldas/react-d3-graph/pull/45) ([danielcaldas](https://github.com/danielcaldas))

## [1.0.0](https://github.com/danielcaldas/react-d3-graph/tree/1.0.0) (2017-12-02)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/0.4.0...1.0.0)

**Closed issues:**

-   How can I get onMouseOverLink event? [\#25](https://github.com/danielcaldas/react-d3-graph/issues/25)

**Merged pull requests:**

-   Fix/tests coverage [\#44](https://github.com/danielcaldas/react-d3-graph/pull/44) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/on drag node handler [\#42](https://github.com/danielcaldas/react-d3-graph/pull/42) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/on mouse over and out link [\#40](https://github.com/danielcaldas/react-d3-graph/pull/40) ([danielcaldas](https://github.com/danielcaldas))
-   Set proper defaults for Graph component config [\#39](https://github.com/danielcaldas/react-d3-graph/pull/39) ([danielcaldas](https://github.com/danielcaldas))
-   Fix semantics mouse over methods in Graph component [\#38](https://github.com/danielcaldas/react-d3-graph/pull/38) ([danielcaldas](https://github.com/danielcaldas))

## [0.4.0](https://github.com/danielcaldas/react-d3-graph/tree/0.4.0) (2017-11-11)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/0.3.0...0.4.0)

**Implemented enhancements:**

-   Node version [\#29](https://github.com/danielcaldas/react-d3-graph/issues/29)

**Merged pull requests:**

-   Refactor/improve code structure [\#35](https://github.com/danielcaldas/react-d3-graph/pull/35) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/highlight nodes degree [\#34](https://github.com/danielcaldas/react-d3-graph/pull/34) ([danielcaldas](https://github.com/danielcaldas))
-   Update node engine version in package.json [\#32](https://github.com/danielcaldas/react-d3-graph/pull/32) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/sandbox improvements [\#27](https://github.com/danielcaldas/react-d3-graph/pull/27) ([danielcaldas](https://github.com/danielcaldas))

## [0.3.0](https://github.com/danielcaldas/react-d3-graph/tree/0.3.0) (2017-10-21)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/0.2.1...0.3.0)

**Implemented enhancements:**

-   Squeezing if "staticGraph": true [\#24](https://github.com/danielcaldas/react-d3-graph/issues/24)

**Fixed bugs:**

-   Squeezing if "staticGraph": true [\#24](https://github.com/danielcaldas/react-d3-graph/issues/24)

**Merged pull requests:**

-   Fix/set initial static graph [\#26](https://github.com/danielcaldas/react-d3-graph/pull/26) ([danielcaldas](https://github.com/danielcaldas))
-   Refactor/general improvements [\#22](https://github.com/danielcaldas/react-d3-graph/pull/22) ([danielcaldas](https://github.com/danielcaldas))
-   Fix typo node.stype -\> node.symbolType [\#21](https://github.com/danielcaldas/react-d3-graph/pull/21) ([danielcaldas](https://github.com/danielcaldas))
-   Bump several dependencies to latest. New yarn.lock [\#20](https://github.com/danielcaldas/react-d3-graph/pull/20) ([danielcaldas](https://github.com/danielcaldas))
-   Refactor/documentation revisited [\#19](https://github.com/danielcaldas/react-d3-graph/pull/19) ([danielcaldas](https://github.com/danielcaldas))

## [0.2.1](https://github.com/danielcaldas/react-d3-graph/tree/0.2.1) (2017-09-17)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/0.2.0...0.2.1)

**Merged pull requests:**

-   Fix/remove node link scu methods [\#18](https://github.com/danielcaldas/react-d3-graph/pull/18) ([danielcaldas](https://github.com/danielcaldas))
-   Calc proper value for node strokeWith when applying pan&zoom [\#17](https://github.com/danielcaldas/react-d3-graph/pull/17) ([danielcaldas](https://github.com/danielcaldas))

## [0.2.0](https://github.com/danielcaldas/react-d3-graph/tree/0.2.0) (2017-09-16)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/0.1.0...0.2.0)

**Merged pull requests:**

-   Refactor/d3 tree shaking [\#16](https://github.com/danielcaldas/react-d3-graph/pull/16) ([danielcaldas](https://github.com/danielcaldas))
-   Generate bundle stats with webpack visualizer [\#15](https://github.com/danielcaldas/react-d3-graph/pull/15) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/pan and zoom [\#14](https://github.com/danielcaldas/react-d3-graph/pull/14) ([danielcaldas](https://github.com/danielcaldas))

## [0.1.0](https://github.com/danielcaldas/react-d3-graph/tree/0.1.0) (2017-08-05)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/0.0.2...0.1.0)

**Implemented enhancements:**

-   Adding nodes? [\#7](https://github.com/danielcaldas/react-d3-graph/issues/7)

**Merged pull requests:**

-   Refactor/sandbox improvements [\#12](https://github.com/danielcaldas/react-d3-graph/pull/12) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/default node symbol [\#11](https://github.com/danielcaldas/react-d3-graph/pull/11) ([danielcaldas](https://github.com/danielcaldas))
-   Fix/not call graph configs inside component did update [\#10](https://github.com/danielcaldas/react-d3-graph/pull/10) ([danielcaldas](https://github.com/danielcaldas))
-   Refactor/update graph data [\#9](https://github.com/danielcaldas/react-d3-graph/pull/9) ([danielcaldas](https://github.com/danielcaldas))

## [0.0.2](https://github.com/danielcaldas/react-d3-graph/tree/0.0.2) (2017-04-25)

[Full Changelog](https://github.com/danielcaldas/react-d3-graph/compare/0.0.1...0.0.2)

## [0.0.1](https://github.com/danielcaldas/react-d3-graph/tree/0.0.1) (2017-04-25)

**Merged pull requests:**

-   Feature/docs [\#6](https://github.com/danielcaldas/react-d3-graph/pull/6) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/test suite [\#5](https://github.com/danielcaldas/react-d3-graph/pull/5) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/sandbox [\#4](https://github.com/danielcaldas/react-d3-graph/pull/4) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/npm dependencies [\#3](https://github.com/danielcaldas/react-d3-graph/pull/3) ([danielcaldas](https://github.com/danielcaldas))
-   Feature/graph component decoupling [\#2](https://github.com/danielcaldas/react-d3-graph/pull/2) ([danielcaldas](https://github.com/danielcaldas))
-   Graph forces [\#1](https://github.com/danielcaldas/react-d3-graph/pull/1) ([danielcaldas](https://github.com/danielcaldas))

\* _This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)_
