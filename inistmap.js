/* INISTMap: small, dependency-free interactive map for Niger State, Nigeria. */
(function (root) {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const WARD_MAP_CACHE = new WeakMap();
  const BUILTIN_SVG = new TextDecoder().decode(Uint8Array.from(atob(
    'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MzIgNTE2IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGFyaWEtbGFiZWw9Ik5pZ2VyIFN0YXRlIGxvY2FsIGdvdmVybm1lbnQgYXJlYXMiPjxnIGNsYXNzPSJpbmlzdG1hcC1yZWdpb25zIj48cGF0aCBpZD0ibmdqczciIGQ9Ik01MzMgMzYybDEgLTE1IDM4IC0xYzMsMiA1LDQgOCw2IDIsMiA1LDQgOCw3IDEsMiAzLDMgNSw0IDAsLTIgMCwtMiAxLC00IDEsLTYgLTEsLTExIC0yLC0xNiAwLC0yIDEsLTIgMywtNCAzLC0yIDQsLTIgNiwxIDEsMiAyLDQgNCwzIDEsMCAyLDAgMywtMSAzLC0xIDIsLTMgMiwtNiAwLC0zIC0yLC04IDMsLTggMiwwIDYsMSA1LC0zIC0zLC02IC0xMCwtMyAtOSwtOSAwLC02IDQsLTcgOCwtMTAgMSwtMSAzLC0yIDMsLTQgMCwwIDAsMCAwLDAgLTEsMiAtMywzIC01LDMgLTEsMCAtMiwxIC0yLDAgLTUsLTIgLTYsLTUgLTEyLC0zIC0zLDIgLTQsMiAtOCwzIC0yLDAgLTUsMSAtNywxIC00LDEgMCw0IDEsNSA1LDMgMCwzIC0zLDMgLTYsMSAtNiw1IC0xNCw0IC0yLC0xIC01LDIgLTcsMyAtMywzIC02LDYgLTksNCAtMSwtMSAtMiwtMSAtMywtMiAtMiwtMSAtOCwtMSAtMTAsLTFsMCAxYzAsMCAwLDAgMCwwIDEsMSAxLDIgMSwzIDEsMSAyLDIgMiwzIDEsNCAtMSwyIC0zLDMgLTEsMCAwLDQgMCw1IDAsMSAwLDIgLTEsMiAtMSwxIC0zLC0xIC00LC0yIC0xLC0yIC0yLC0zIC0zLC00bC0xIC0xIDAgMGMtMSwtMSAtMSwtMSAtMywtMWwwIDBjLTIsMCAtMywwIC0zLDEgMCwxIDEsNCAxLDUgMCwxIDEsMSAxLDIgMyw2IDIsOSAyLDE2IDAsNCAxLDQgMyw3eiIgLz48cGF0aCBpZD0ibmdqczZhIiBkPSJNNTQxIDMyM2wwIC0xYzIsMCA4LDAgMTAsMSAxLDEgMiwxIDMsMiAzLDIgNiwtMSA5LC00IDIsLTEgNSwtNCA3LC0zIDgsMSA4LC0zIDE0LC00IDMsMCA4LDAgMywtMyAtMSwtMSAtNSwtNCAtMSwtNSAyLDAgNSwtMSA3LC0xIDQsLTEgNSwtMSA4LC0zIDYsLTIgNywxIDEyLDMgMCwxIDEsMCAyLDAgMiwtMSA2LC0yIDYsLTUgMCwtNiAwLC00IDQsLTggMiwtMiA0LC0zIDQsLTcgLTEsLTYgLTcsLTIgLTgsLTcgLTEsLTQgNSwtOSAtNCwtMTAgLTMsLTEgLTcsLTIgLTcsLTUgMCwtMSAwLC0yIDAsLTIgLTIsMCAtNCwwIC02LDAgLTQsMCAtNiwtMiAtMTAsMSAtMiwyIC0zLDQgLTEsNiAzLDQgNywyIDcsOCAwLDQgLTIsOSAtNiw5IC0xLDAgLTUsMCAtNiwtMSAtNSwtMSAtMywtNSAtNywtNiAtMywtMSAtNiw2IC02LDggMCwzIC0xLDUgLTMsNyAtMiwzIC0yLDQgLTUsMiAtMiwtMiAtNCwwIC01LDIgLTEsMiAtMiwzIC01LDMgLTEsMCAtMiwwIC0zLDAgLTMsMCAtNCwwIC03LDEgLTMsLTIgLTQsLTMgLTUsLTUgLTEsMCAtMSwwIC0yLC0xIC02LC0yIC04LC0yIC0xMywyIC02LDQgLTQsMiAtOSwwIC0yLDAgLTYsMSAtNiwtMSAwLDAgMCwwIDEsLTEgLTIsMSAtMywxIC02LDEgLTIsMCAtNSwxIC03LDEgLTEsMCAtMywxIC01LDEgLTIsMSAtMywwIC00LDEgLTQsMSAtMywzIC0zLDcgMCw1IC0yLDYgLTUsMTAgMCwxIC0yLDMgLTMsNGwtMSAzIDAgMTEgNSAxMCAwIDBjMSwxIDMsMCA0LDAgMCwwIDAsMCAwLDBsMCAwYzIsMSAzLDIgNCw0bDEgMCAwIDBjMSwwIDEsMCAyLDAgMSwwIDEsMCAyLDAgMSwwIDMsMCA1LDAgMywwIDQsLTIgOCwwIDEsMSAyLDIgNCwybDIgLTFjMCwtMSAwLC0xIDEsLTEgMiwtMiA1LC00IDcsLTYgMCwwIDEsMCAxLDAgMCwtMSAwLC0xIC0xLC0yIDAsMCAtMSwtMiAtMSwtMiAwLC0xIDAsLTEgMCwtMiAwLC0xIDAsLTMgMCwtNCAwLC0xIDEsLTEgMSwtMiAxLC0xIDEsLTEgMiwtMiAxLC0xIDIsLTEgMiwtMSAxLDAgMiwtMSAyLC0xIDEsMCAyLC0xIDMsLTEgMSwwIDEsMCAyLDAgMSwwIDIsMCAyLC0xIDEsMCAyLC0xIDMsLTEgMSwwIDEsMCAxLDB6IiAvPjxwYXRoIGlkPSJuZ2pzMTIiIGQ9Ik01NTcgMzAwYzMsMCA0LC0xIDUsLTMgMSwtMiAzLC00IDUsLTIgMywyIDMsMSA1LC0yIDIsLTIgMywtNCAzLC03IDAsLTIgMywtOSA2LC04IDQsMSAyLDUgNyw2IDEsMSA1LDEgNiwxIDQsMCA2LC01IDYsLTkgMCwtNiAtNCwtNCAtNywtOCAtMiwtMiAtMSwtNCAxLC02IDQsLTMgNiwtMSAxMCwtMSAzLDAgNSwwIDgsLTEgNSwwIDEwLDAgMTEsLTUgMSwtNCAwLC0yIC0xLC02IDAsLTEgMCwtMyAwLC00IC0xLC00IC0xLC02IC0yLC05IDAsLTUgMCwtMTEgLTIsLTE1IC0yLC0zIC0xLC0yIC00LC0yIC00LC0xIC0zLC0xIC03LDAgLTIsMSAtNSwxIC03LC0xIDAsMCAtMSwwIC0xLDAgLTMsMSAtNiwwIC05LDEgLTMsMSAtOSwwIC0xMywtMSAtMiwwIDAsMCAtMiwwIC0yLC0yIC01LC0zIC04LC00IC00LC0yIC01LC0zIC05LC00IC0xLDAgLTIsMCAtMiwwIC00LC0xIC01LDEgLTgsMyAtMiwyIC0yLDMgLTIsNSAwLDMgLTEsMyAtMywzIC00LDAgLTMsNiAyLDcgMywwIDMsMCAyLDMgLTIsNCAtMyw0IC0zLDEwIDEsMiAxLDUgMSw4IDAsMyAwLDggMiwxMSAyLDMgMCw0IC0zLDYgLTMsMiAtMyw4IC0yLDEyIDAsNSAtMSw5IDAsMTQgMSwzIDEsNCAwLDQgMSwyIDIsMyA1LDUgMywtMSA0LC0xIDcsLTEgMSwwIDIsMCAzLDB6IiAvPjxwYXRoIGlkPSJuZ2pzMTQiIGQ9Ik00NDMgMjYwYzIsMCA0LDEgNywxIDUsMSAyMCwyIDI1LDEgNywtNCA0LC01IDksLTkgMiwtMSAyLDEgNSwyIDcsMiAxMywwIDE1LDggNCw5IDgsNiAxMiwxMiAyLDUgMiwxMSAwLDE1IC0xLDIgLTQsNiAtNCw2IDAsMiA0LDEgNiwxIDUsMiAzLDQgOSwwIDUsLTQgNywtNCAxMywtMiA0LDIgMywxIDIsLTMgLTEsLTUgMCwtOSAwLC0xNCAtMSwtNCAtMSwtMTAgMiwtMTIgMywtMiA1LC0zIDMsLTYgLTIsLTMgLTIsLTggLTIsLTExIDAsLTMgMCwtNiAtMSwtOCAwLC02IDEsLTYgMywtMTAgMSwtMyAxLC0zIC0yLC0zIC01LC0xIC02LC03IC0yLC03IDIsMCAzLDAgMywtMyAwLC0yIDAsLTMgMiwtNSAzLC0yIDQsLTQgOCwtMyAxLDAgMywwIDQsLTEgMCwtMyAtMTAsLTMgLTMsLTEwIDMsLTMgMywtMiA3LC00IDMsLTEgMiwtMiA0LC01IDQsLTUgNSwtMyAxMCwtNiAxLC0xIDUsLTMgNSwtNCAxLC0yIDIsLTQgMywtNyAwLC0yIC0yLC0zIC00LC00IC0yLC0xIC00LC0xIC02LC0zIC0yLC0xIC0zLC0xIC02LC0xIC0zLDAgLTYsLTIgLTUsLTYgMCwtMyAwLC0zIDEsLTUgMSwtMSAxLC0zIDIsLTUgMSwtMyAwLC0zIC0xLC02IC0xLC0yIC00LC04IC02LC05IC0xLDAgLTMsMCAtNCwwIC0zLC0xIC00LDIgLTYsMiAtMiwtMSAtMiwtMiAtMiwtMyAtMiwtNiAxLC0xMSAtMywtMTUgLTMsLTMgLTgsLTIgLTEyLC0yIDAsMCAtMSwwIC0yLDAgLTYsMiAwLDkgLTEsMTAgLTEsMiAtMywxIC01LDEgLTMsMCAtNSwtMiAtOSwwIC0yLDAgLTMsMSAtNSwyIC0yLDEgLTEwLDUgLTEzLDQgLTEsLTEgLTEsLTEgLTMsLTIgMCwxIDAsMSAwLDFsMCAwIDAgMCAwIDBjMCwwIDAsMCAwLDBsMCAwIDAgMCAwIDAgMCAxIDAgMGMtMSwxIC0xLDIgLTIsNGwwIDBjMCwwIDAsMSAwLDFsMCAwYzAsMCAwLDAgMCwwbDAgMGMwLDEgMCwxIDAsMWwwIDBjMCwwIDAsMCAtMSwwbDAgMGMwLDEgMCwxIDAsMWwwIDBjMCwwIDAsMCAwLDBsMCAwYzAsMCAwLDAgMCwxbDAgMGMwLDAgMCwwIDAsMGwwIDBjMCwwIDAsMCAwLDBsMCAwIDAgMGMwLDAgMCwwIDAsMWwwIDAgMCAwIDAgMGMwLDAgMCwwIDAsMGwwIDBjMCwwIDAsMSAwLDFsMCAwYzAsMCAwLDAgMCwwbDAgMCAwIDBjMCwwIDAsMCAwLDBsMCAxYzAsMCAwLDAgMCwwbDAgMGMwLDAgMCwwIDAsMGwwIDBjMCwwIDAsMSAwLDFsMCAwYzAsMCAwLDAgMCwwIDIsNyA0LDEyIC0xLDE5IC0xLDEgLTIsMiAtMywzbC0xIDFjLTEsMiAtNiw3IC04LDkgLTIsMSAtNCwyIC03LDQgLTQsNCAtNCw4IC01LDE0IDAsMiA3LDMgOSwzIDcsMSA5LDAgMTQsNiA0LDUgNSwxMSA2LDE3IDAsNiAzLDQgLTQsNSAtOCwxIC00LDEwIC02LDEzIC0xLDIgLTMsMyAtNSw0IC01LDEgLTExLC0xIC0xNSwtNCAtMiwtMiAtNCwtMyAtNywtNGwtMSAwYy0yLC0xIC00LC0xIC02LC0xIC0yLDAgLTQsMCAtNywwIC00LC0xIC02LDEgLTgsNCAwLDEgMCwxIDAsMSAxLDAgMiwtMSAzLC0xIDQsMSA0LDkgMywxMyAwLDQgLTEsNiAtMSw5bDAgMHptNTAgLTExOWMwLDAgMCwwIDAsMGwwIDB6bTAgMmMwLDAgMCwwIDAsMGwwIDB6IiAvPjxwYXRoIGlkPSJuZ2pzMTYiIGQ9Ik00NjIgMTQwYzIsLTIgNCwtMyA2LC01IDIsLTIgNCwtMyA2LC01bDEgLTFjNSwtNCA3LC00IDEzLC01IDQsLTIgNSwwIDcsMyA0LDYgLTMsOSAtMiwxOCAyLDcgNCwxMiAtMSwxOSAtMSwxIC0yLDIgLTMsM2wtMSAxYy0xLDIgLTYsNyAtOCw5IC0yLDEgLTQsMiAtNyw0IC00LDQgLTQsOCAtNSwxNCAwLDIgNywzIDksMyA3LDEgOSwwIDE0LDYgNCw1IDUsMTEgNiwxNyAwLDYgMyw0IC00LDUgLTgsMSAtNCwxMCAtNiwxMyAtMSwyIC0zLDMgLTUsNCAtNSwxIC0xMSwtMSAtMTUsLTQgLTIsLTIgLTQsLTMgLTcsLTRsLTEgMGMtMiwtMSAtNCwtMSAtNiwtMSAtMiwwIC00LDAgLTcsMCAtNCwtMSAtNiwxIC04LDQgMCwxIDAsMSAwLDEgLTEsMSAtMiwzIC0zLDUgLTYsNyAtOSw2IC0xNyw3IC0zLDAgLTUsMCAtOCwwIDAsMCAtMSwwIC0yLC0xIC0xLDAgLTEsMCAtMSwwIC0yLC0xIC00LC0yIC02LC0zIC0zLC0zIDAsLTQgLTEsLTggMCwtMiAtMSwtNCAtMSwtNiAyLC0xIDQsLTIgNSwtNCAzLC03IDQsLTYgNCwtMTQgMCwtMSAwLC0yIDEsLTRsMCAwYzIsMCAzLC0yIDMsLTQgMCwtNCAtMSwtNSAtMSwtOSAxLC0zIDEsLTYgMSwtOSAxLC01IDIsLTYgNCwtMTAgMSwtMyAwLC02IDAsLTEwIDAsLTMgLTIsLTUgLTIsLTkgMCwtMyAwLC0xMCAzLC0xMyAzLC0xIDQsLTEgNiwtMiAxLDAgMSwwIDEsMCA0LDQgNCwzIDksNiAzLDIgNCw1IDUsOCAxLDQgNCwzIDYsMSAxLC0xIDIsLTIgMywtMyAyLC0yIDMsLTQgNSwtNiAyLC0zIDQsLTYgNywtOSAxLC0xIDIsLTEgMywtMnoiIC8+PHBhdGggaWQ9Im5nanM1IiBkPSJNNDczIDQ1MmwwIDBjMiw3IDUsMTUgNywyMiAxLDIgMSwxIDIsMyAzLDQgNCwyIDcsNSAzLDIgNiw2IDksOCAxLDEgMSwxIDEsMSA0LDMgNSw3IDgsMTAgMiwzIDMsNSA2LDggMiwzIDQsNSA3LDcgNCwxIDYsLTIgNiwtNiAwLC0zIDEsLTUgMiwtOCAxLC0zIDIsLTEgNCwwIDQsMSAwLC01IDMsLTggMywtMiA2LC0yIDgsLTMgMiwtMiAyLC02IDMsLTkgLTMsLTEgLTQsMCAtNiwwIC00LC0yIC01LC05IC03LC0xMyAwLC0zIDEsLTQgMSwtNyAwLC0zIDAsLTUgMCwtOCAwLC0zIDAsLTYgMCwtOWwtMSAtNTVjMCwtNiAwLC0xMiAwLC0xOCAwLC0yIDEsLTggMCwtOSAtMiwtNCAtMywtMyAtMywtOCAwLC03IDEsLTEwIC0yLC0xNiAwLC0xIC0xLC0xIC0xLC0yIDAsLTEgLTEsLTQgLTEsLTUgMCwtMSAxLC0xIDMsLTFsMCAwYzIsMCAyLDAgMywxbDAgMCAxIDFjMSwxIDIsMiAzLDQgMSwxIDMsMyA0LDIgMSwwIDEsLTEgMSwtMiAwLC0xIC0xLC01IDAsLTUgMiwtMSA0LDEgMywtMyAwLC0xIC0xLC0yIC0yLC0zIDAsLTEgMCwtMiAtMSwtMyAwLC0xIDAsMCAtMSwwIC0xLDAgLTIsMSAtMywxIDAsMSAtMSwxIC0yLDEgLTEsMCAtMSwwIC0yLDAgLTEsMCAtMiwxIC0zLDEgMCwwIC0xLDEgLTIsMSAwLDAgLTEsMCAtMiwxIC0xLDEgLTEsMSAtMiwyIDAsMSAtMSwxIC0xLDIgMCwxIDAsMyAwLDQgMCwxIDAsMSAwLDIgMCwwIDEsMiAxLDIgMSwxIDEsMSAxLDIgMCwwIC0xLDAgLTEsMCAtMiwyIC01LDQgLTcsNiAtMSwwIC0xLDAgLTEsMWwtMiAxYy0yLDAgLTMsLTEgLTQsLTIgLTQsLTIgLTUsMCAtOCwwIC0yLDAgLTQsMCAtNSwwIC0xLDAgLTEsMCAtMiwwIC0xLDAgLTIsMCAtMywwIDIsMyAyLDcgMiwxMCAtMSw2IC0zLDYgMCwxMiAyLDQgMyw0IDMsOCAxLDYgNyw2IDQsMTUgLTEsMyAtMSwzIC0xLDcgMCwyIDEsNCAyLDUgMiw0IDMsNiAwLDkgLTIsMiAtMyw0IC01LDYgLTQsMyAtMywzIC02LDYgLTEsMSAtMSw0IDAsNiAwLDQgMiw1IDMsOSAwLDIgLTIsNSAtMyw2IC0zLDMgLTIsMyAtNCw2IC0xLDAgLTEsMiAtMiwyIC0yLDEgLTQsMSAtNiwwIC0zLC0xIC0yLC0zIC02LC0zeiIgLz48cGF0aCBpZD0ibmdqczI0IiBkPSJNNDY5IDQ0NmMyLDMgNCw2IDQsNiA0LDAgMywyIDYsMyAyLDEgNCwxIDYsMCAxLDAgMSwtMiAyLC0yIDIsLTMgMSwtMyA0LC02IDEsLTEgMywtNCAzLC02IC0xLC00IC0zLC01IC0zLC05IC0xLC0yIC0xLC01IDAsLTYgMywtMyAyLC0zIDYsLTYgMiwtMiAzLC00IDUsLTYgMywtMyAyLC01IDAsLTkgLTEsLTEgLTIsLTMgLTIsLTUgMCwtNCAwLC00IDEsLTcgMywtOSAtMywtOSAtNCwtMTUgMCwtNCAtMSwtNCAtMywtOCAtMywtNiAtMSwtNiAwLC0xMiAwLC01IC0xLC0xMSAtNiwtMTRsMCAwYzAsMCAwLDAgMCwwIC0xLDAgLTMsMSAtNCwwIC03LDAgLTEwLC0yIC0xNiwzIC01LDQgLTYsLTIgLTExLDcgLTEsMiAtMywzIC0zLDUgLTIsNSA5LDExIDEsMTQgLTMsMiAtNCwyIC01LDUgLTEsNSAtMSw3IDAsMTIgMSwyIDEsNCAyLDcgMSw0IDEsMyAwLDggLTEsNSAxLDQgNCw0IDQsMSA0LDUgMyw4IDAsNCAyLDkgNCwxMyA1LDUgNiw4IDYsMTUgMCwxIDAsMSAwLDF6IiAvPjxwYXRoIGlkPSJuZ2pzOSIgZD0iTTM4MyAzOTFjMCwwIDAsLTEgMSwtMSAzLC0zIDUsLTYgOSwtOSAyLC0yIDMsLTQgNSwtNSA1LC0yIDYsMCAxMCwwIDUsLTEgNywtOCA4LC0xMiAxLC01IDMsLTIgNSwwIDMsMyA2LDMgOCw1IDEsMCAxLC0xIDIsLTEgMiwtMSA0LC01IDUsLTcgMywtNyA1LC00IDgsLTggMSwtNCAtNSwtNyAtNywtOCAtNCwtMSAtNCwtMSAtNiwtMyAtNCwtMyAyLC00IDAsLTggLTIsLTIgLTIsLTQgLTMsLTcgMCwtMiAtMSwtMyAxLC01IDIsLTIgMywtMyA0LC02IDAsLTQgMCwtNCAyLC04IDIsLTIgMiwtNCA0LC00IDEsLTEgMiwtMiAyLC0zIDAsLTMgLTIsLTMgLTQsLTMgLTQsMCAtMywtMSAtNiwtMyAtMSwtMiAtNCwtNSAtNywtMyAtMywzIC0yLDEgLTYsMiAtNSwxIC0zLDIgLTksMSAtMywtMSAtOCwtMSAtMTEsMCAtNCwzIC00LDYgLTYsOSAwLDAgMCwxIC0xLDIgLTIsNSAtMyw5IC0yLDEzIDAsOSAtNCwxMSAtNiwxNCAtMiw2IC02LDQ2IC01LDUxIDAsMyAyLDUgNSw3eiIgLz48cGF0aCBpZD0ibmdqczQiIGQ9Ik00MjIgMzc4Yy03LDcgMiwxMCAzLDE0IDEsMSAxLDIgMSwzIDAsMiAtMSwyNSAtMSwyNSAxLDEgMiw1IDIsNSAzLDIgMTMsMyAxNyw0IDIsMCA1LDAgNywxIDMsMiA0LDMgNyw1IDUsMiA3LDcgMTEsMTEgMCwwIDAsMCAwLC0xIDAsLTcgLTEsLTEwIC02LC0xNSAtMiwtNCAtNCwtOSAtNCwtMTMgMSwtMyAxLC03IC0zLC04IC0zLDAgLTUsMSAtNCwtNCAxLC01IDEsLTQgMCwtOCAtMSwtMyAtMSwtNSAtMiwtNyAtMSwtNSAtMSwtNyAwLC0xMiAxLC0zIDIsLTMgNSwtNSA4LC0zIC0zLC05IC0xLC0xNCAwLC0yIDIsLTMgMywtNSA1LC05IDYsLTMgMTEsLTcgNiwtNSA5LC0zIDE2LC0zIDEsMSAzLDAgNCwwIDAsMCAtNCwtNCAtMywtNiAxLDAgMiwwIDIsLTMgMSwtNyAyLC04IC0xLC0xNiAwLC0xIC0xLC0zIC0yLC0zIC0zLDAgLTYsMSAtOSwxIC0zLDAgLTUsMCAtNywzIC0zLDMgLTQsMSAtOCwwIC0xLDAgLTIsMCAtNCwwIC0zLDAgLTUsMSAtNywwIC0yLDAgLTEsLTIgMCwtMyAyLC00IDIsLTUgLTEsLTkgLTIsLTIgLTUsLTMgLTgsLTQgLTMsMCAtMywyIC01LDQgLTIsNCAtMiw0IC0yLDggLTEsMyAtMiw0IC00LDYgLTIsMiAtMSwzIC0xLDUgMSwzIDEsNSAzLDcgMiw0IC00LDUgMCw4IDIsMiAyLDIgNiwzIDIsMSA4LDQgNyw4IC0zLDQgLTUsMSAtOCw4IC0xLDIgLTMsNiAtNSw3IC0xLDEgLTUsMSAtNiwyIDAsMCAxLDIgMSwzIDAsMyAtMiw0IC00LDV6IiAvPjxwYXRoIGlkPSJuZ2pzMyIgZD0iTTM3MyA0MjNjMiwzIDYsNCAxMCw0IDIsMCAxMywxIDE1LDAgNCwtMSAyLC0yIDcsLTIgMiwxIDQsLTEgNywtMSAzLDAgNSwwIDcsMCA0LDAgNiwxIDksMiAxLDAgMiwtMSAyLC0yIDEsLTIgMiwtNCA0LC01IC0zLC01IC0zLC01IC02LC0xMCAtMSwtMSAtMiwtMyAtMiwtNSAwLC01IDQsLTUgMSwtMTIgMCwtMSAtMywtNSAtMywtNiAwLC03IDEsLTYgNSwtMTEgMywtOSAtMywtNiAtOCwtMTEgLTIsLTIgLTQsLTUgLTUsMCAtMSw0IC0zLDExIC04LDEyIC00LDAgLTUsLTIgLTEwLDAgLTIsMSAtMywzIC01LDUgLTQsMyAtNiw2IC05LDkgLTEsMCAtMSwxIC0xLDFsMCAwYzEsMCA2LDYgNCw3IC0xLDIgLTIsMyAtNCw1IC0yLDMgLTQsNSAtNiw3IC0xLDEgLTIsMiAtMiwzIC0xLDIgLTEsNCAtMSw2IDAsMSAwLDQgLTEsNCAwLDAgMCwwIDAsMHoiIC8+PHBhdGggaWQ9Im5nanMyMyIgZD0iTTI2MCAxMDFjMywtNiA1LC04IC0xLC0xMyAwLC0xIC0zLC0yIC00LC0zIC0zLC0zIC01LC01IC0yLC05IDMsLTMgNiwtMiA2LC04IDAsLTMgLTEsLTggLTIsLTExIDAsLTEgMCwtMiAwLC0yIC0xLC0zIC0xLC0zIC0zLC01IDAsMCAwLDAgLTEsMCAtNCwyIC0zLC0xIC02LC00bDAgMGMtMiwtMiAtNSwtMiAtOCwtMiAtMSwwIC0zLDAgLTQsMCAtNiwwIC0xMCwtMyAtMTUsLTYgLTEsMCAtMiwwIC0zLC0xIC0yLC0xIC00LC0xIC03LC0yIC0xLDAgMCwtMSAtMSwtMmwwIDBjLTIsLTIgLTQsLTMgLTMsLTcgMCwtNCAzLC02IDYsLTggMSwwIDMsLTEgNCwtMSAyLC0xIDMsLTIgNSwtMyAzLC0yIDEyLC01IDE1LC02IDMsMCA1LC0xIDcsLTEgNSwtMSAxMCwtMyAxNSwtNCA0LC0xIDcsLTEgMTEsLTIgNCwtMSA4LC0xIDEyLC0xIDIsMCA0LDAgNSwwIDEsMCAyLDAgMywxIDUsMCA1LC0yIDEwLDFsMCAwYzEsMSAxLDEgMSwxIDYsNSA0LDEyIDQsMThsMSAxYzAsMCAwLDAgMCwxIDEsMyA2LDcgMTAsOCAzLDIgMywzIDMsNyAwLDQgMCw5IDAsMTMgLTIsMiAtNCw0IC02LDUgLTQsNSAtNCwxMiAtNiwxOCAtMiw0IC0yLDUgLTEsMTAgMSwyIDEsNCAxLDYgMCwzIC0yLDQgLTIsNyAtMSwtMSAtMSwtMSAtMSwtMSAtMSwwIC0xLDAgLTIsMCAtMSwwIC0xLDEgLTIsMSAtMSwxIC0yLDIgLTQsMyAtMiwyIC0yLC0xIC00LC0xIC0xLDEgLTIsMiAtMiwzIC0xLDEgLTMsNCAtNCw0IC0yLDAgLTQsLTEgLTYsLTIgLTEsMCAtMywtMSAtNCwtMiAtMywtMSAtNCwtMSAtNywwIC0zLDAgLTUsLTEgLTgsLTF6IiAvPjxwYXRoIGlkPSJuZ2pzMTciIGQ9Ik0zOTIgMjEwYzIsLTEgNywtMyA4LC00IDMsMCA2LDUgOSw1IDIsMCAzLC0yIDMsLTQgMCwtNCAtMSwtNSAtMSwtOSAxLC0zIDEsLTYgMSwtOSAxLC01IDIsLTYgNCwtMTAgMSwtMyAwLC02IDAsLTEwIDAsLTMgLTIsLTUgLTIsLTkgMCwtMyAwLC0xMCAzLC0xMyAzLC0xIDQsLTEgNiwtMiA2LC0zIDAsLTcgNiwtMTAgNCwtMiAzLC00IDIsLTggLTEsLTMgMCwtNSAxLC04IDMsLTcgLTMsLTggLTMsLTE0IDAsLTMgMSwtNCAxLC03IDAsLTYgMSwtNyA0LC0xMSAxLC0xIDQsLTYgNCwtOCAtMSwtNiAtNCwtOSAtNiwtMTQgLTEsLTIgLTIsLTMgLTMsLTUgLTEsLTQgLTUsLTggLTcsLTEybC0xIDBjLTEsLTIgLTEsLTMgLTMsLTQgLTIsLTQgLTIsLTUgLTYsLTggLTYsLTQgLTgsMCAtMTMsNCAwLDEgLTEsMSAtMiwyIC0xLDEgLTIsMyAtMyw0IC0zLDQgLTQsMiAtOCwyIC02LDEgLTgsMyAtMTMsNSAtNCwxIC04LDMgLTEzLDUgLTMsMSAtNiwzIC05LDQgLTQsMiAtOCwxIC0xMiwxIC0zLDAgLTUsMCAtOCwwIC02LDEgLTEwLDIgLTEzLC00IC0yLC0zIDEsLTUgMCwtOCAtMiwyIC00LDQgLTYsNSAtNCw1IC00LDEyIC02LDE4IC0yLDQgLTIsNSAtMSwxMCAxLDIgMSw0IDEsNiAtMSwzIC0yLDUgLTMsOWwwIDBjLTEsNSAtMiwxMCAtMywxNWw0IDVjMCwtMSAwLC0yIDAsLTQgMCwtMSAwLC0xIDAsLTIgMCwtMSAwLC0yIDAsLTQgMywtMSA1LC0yIDksLTIgNywtMSA3LDAgMTQsMiAzLDEgMywwIDUsLTEgMiwtMiA0LC00IDYsLTIgMiwyIDQsNCA1LDcgMCwxIDIsNCAyLDYgMSwzIDEsNSAzLDggMiwyIDMsMyA1LDUgMyw0IDIsOCAyLDE0IDAsMyAwLDUgMCw4IDAsNSAyLDYgMywxMCAxLDUgMSwxMCAzLDE0IDEsNCAxLDcgMiwxMCAwLDAgLTMsMSAtNSwzbDUgOGMwLDAgMjksMTAgMjksMTF6IiAvPjxwYXRoIGlkPSJuZ2pzMjEiIGQ9Ik00MyAzNGMxOCw5IDI4LDE3IDQ2LDIxbDQ5IC0xYzIsMyA1LDEyIDcsMTQgMSwwIC0xLDE5IDMsMjggNCw5IC04LDM2IC03LDM2bDI5IDIgMCAxYy01LDcgLTcsMTMgLTYsMTkgMCw2IDAsMTIgNSwxNiA3LDQgNyw5IDQsMTggLTMsMyAtNCw5IC0xLDE0IDMsNSA2LDkgNSwxOCAtMiw0IC0xLDggMiwxNCA4LDIxIDksMzEgMSw0MyAtMSwyIC0yLDUgLTQsNyAtNiw2IC04LDEzIDAsMjMgMiwxIDIsMyAyLDUgLTMzLDUgLTI1LDUgLTI1LC0zMiAyLC03IDEsLTEyIC01LC0xMSAtMywxIC02LC0yIC0xMCwtNSAtMTYsLTIyIC0zMywtNDIgLTUxLC02MSAtNSwtNyAtMTMsLTggLTI0LC02IC0xMCwtMSAtMTksMCAtMjksMGwtNSAxIDEgLThjLTExLC01IC0xOCwtMTEgLTEyLC0yNCAyLC0zIDMsLTYgNCwtOCAxLC01IDAsLTcgNywtMTEgNCwtMyA2LDAgOSwyIDMsMiA4LDMgMTAsNCAzLC0xNSA0LC0yMSAxMSwtMzAgLTEsLTUgLTIsLTEyIC0yLC0xNyAtNiwtMyAtMTAsLTggLTEyLC0xNSAtNSwtMTAgLTQsLTggMCwtMTcgLTEsLTYgMCwtMTkgLTQsLTIwIC0yLC0yIC01LDEgLTQsLTQgMCwtMTYgLTIsLTE2IDYsLTE2eiIgLz48cGF0aCBpZD0ibmdqczE5IiBkPSJNMTM4IDU0YzIxLC02IDMzLDEgNTQsMTYgMjIsMSAxNCwxNCAxMSwyOCAtMSw4IDAsMTUgLTMsMTZsLTUgNCAtNSA1Yy02LDUgLTEyLDQgLTE4LDExbC0zMSAtMmMtMSwwIDExLC0yNyA3LC0zNiAtNCwtOSAtMiwtMjggLTMsLTI4IC0yLC0yIC01LC0xMiAtNywtMTR6IiAvPjxwYXRoIGlkPSJuZ2pzMSIgZD0iTTE4OCAyODhjMSwtMiA0LC00IDYsLTIgMSwxIDIsMyAzLDQgMyw0IDYsNSAxMCw1IDMsMCA2LC0xIDgsMiAxLDAgMSwxIDEsMiAxLDEgMSwyIDEsMiAwLDYgMCw3IC0zLDEzIC0xLDMgMCw2IDMsOCAxLDEgNCwyIDYsMyAyLDEgMiwxIDUsMSA0LDEgNiwyIDExLDAgMCwtMSAxLC0xIDIsLTEgMywtMiA1LC0zIDgsLTUgMywtMSA1LC00IDksLTUgMiwtMiA0LC0yIDcsLTMgMiwtMSA0LC0yIDcsLTMgMywwIDUsLTEgOCwtMyA0LC0yIDYsLTIgOSwtNiAwLDAgMSwtMSAxLC0xbDAgMCAwIDAgMCAwIDAgMCAwIDAgMSAwIDAgMCAwIC0xIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAtMSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgLTEgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwYzAsMCA1LDUgNSw2IDIsMSA0LDIgNSw0bDAgMGMzLDMgOCw0IDksOCAwLDEgMCwzIC0xLDQgLTIsNSAtNCw3IDAsMTIgMCwwIDEsMSAxLDEgMiwyIDMsMyA0LDUgNCw0IDksMSA4LDEwIDAsMyAtMSw2IC0yLDkgLTEsMyAtMSw2IDIsOGwwIDAgMCAwYy0yLDEgLTUsMSAtOCwyIC0yLDIgLTQsMyAtNiw1IC0yLDEgLTMsMyAtNCw1IDIsMSA1LC01IDEzLDEgMiwwIDMsMSA0LDIgMiwyIDIsNCA0LDcgMSwyIDIsNCA0LDUgMiwwIDQsMSA2LDIgMiwxIDIsMSA1LDIgMywwIDMsMSA1LDNsMCAwYzYsNSA5LC0xIDE1LDVsMCAwIDEgMWMzLDEgNiwxIDgsLTIgMiwtNCAtMSwtMTEgLTEsLTE1IDAsLTEgLTEsLTIgLTEsLTNsMSAwYzEsLTMgMiwtNiAzLC0xMCAxLC0zIDIsLTYgMywtOSAxLC0yIDEsLTcgMSwtOSAwLC0xIDAsLTIgMCwtMyAtMSwtNSAwLC0xMSAyLC0xNiAxLC0yIDIsLTQgMiwtNyAxLC0zIDIsLTUgMywtOCAxLC0zIDIsLTYgMywtOGwwIDAgMCAwYzAsLTEgMiwtNiAxLC02IDAsLTIgNSwtNSAzLC0xIC0yLDUgLTMsOSAtMiwxMyAwLDkgLTQsMTEgLTYsMTQgLTIsNyAtNCwxNyAtMywyMiAzLDkgLTUsMTMgLTIsMjkgMCwzIDIsNSA1LDcgMSwwIDYsNiA0LDcgLTEsMiAtMiwzIC00LDUgLTIsMyAtNCw1IC02LDcgLTEsMSAtMiwyIC0yLDMgLTEsMiAtMSw0IC0xLDYgMCwxIDAsNCAtMSw0IC0xLDEgLTcsLTYgLTksLTcgLTEsLTIgLTQsLTQgLTYsLTVsMCAwYy00LC0yIC0xMCwtOCAtMTMsLTggLTUsMSAtMTYsLTEyIC0xOSwtMTIgLTQsLTEgLTIxLC04IC0yNCwtNyAtMSwwIC04LDMgLTksMyAtNiwtMSAtOCwwIC0xMiwtNSAtMiwtMiAtMywtMyAtNCwtNSAtMywtMyAtNSwtNiAtOCwtOCAwLC0xIC0xLC0xIC0xLC0yIC01LC01IC03LC00IC0xMywtN2wtMSAwYy01LC0yIC0xLC00IC05LC00IC0xLDAgLTIsMCAtMywwIC0xLDAgLTQsMiAtNiwzIC0yLDEgLTUsMSAtNywyIC02LDMgLTEzLDYgLTIwLDMgLTMsLTIgLTMsLTUgLTMsLTggMCwtMSAwLC0yIDAsLTIgMCwtMSAwLC0yIDAsLTMgMCwtNCAtMiwtNyAtNiwtOSAtMywtMSAtNiwwIC05LC0yIC0zLC0yIC00LC00IC03LC02bDAgMGMtMywtMiAtMywtNSAtNCwtOCAwLC0yIDAsLTQgMSwtNiAwLC01IC0zLC04IC00LC03IDEsMCAxLDAgMiwwIDIsMCAzLC0xIDQsLTQgMSwtMyAyLC03IDIsLTEwIDAsLTQgMCwtNyAzLC0xMXoiIC8+PHBhdGggaWQ9Im5nanMxMCIgZD0iTTM3MiAzNzhjMCwtMSAxLC0zIDEsLTUgMSwtMyAyLC02IDMsLTkgMSwtMiAxLC03IDEsLTkgMCwtMSAwLC0yIDAsLTMgLTEsLTUgMCwtMTEgMiwtMTYgMSwtMiAyLC00IDIsLTcgMSwtMyAyLC01IDMsLTggMSwtMyAyLC02IDMsLTggMCwtMSAyLC02IDEsLTYgMCwwIC0yLDAgLTIsMGwtMSAtMWMtMSwwIC0xLDAgLTIsLTEgLTMsLTEgLTQsLTMgLTcsLTEgLTIsMSAtMiwyIC01LDJsMCAwIC0xIDBjLTEsMCAtMiwtMSAtMywtMiAtMiwtMyAtMywtNyAtNCwtMTAgLTEsLTEgLTEsLTIgLTIsLTMgLTEsLTMgLTIsLTUgLTQsLTcgLTQsLTMgLTUsLTMgLTgsLTUgLTMsLTIgLTUsLTQgLTgsLTZsMCAwIDAgMWMtMywtMiAtNSwtNSAtOCwtNyAtMywtMSAtNCwtMyAtNiwtNSAtMiwtMSAtNSwwIC03LDEgLTIsMCAtNCwxIC02LDEgLTMsMSAtNiwxIC05LDIgLTMsMSAtNSwxIC04LDEgLTUsMSAtNCw3IC00LDExIDAsMyAwLDIgLTEsNSAtMSw0IC0yLDUgLTEsMTAgMCwxIDEsMyAwLDRsMCAxYzEsLTEgMSwtMiAyLC0yIDAsMCA1LDUgNSw2IDIsMSA0LDIgNSw0bDAgMGMzLDMgOCw0IDksOCAwLDEgMCwzIC0xLDQgLTIsNSAtNCw3IDAsMTIgMCwwIDEsMSAxLDEgMiwyIDMsMyA0LDUgNCw0IDksMSA4LDEwIDAsMyAtMSw2IC0yLDkgLTEsMyAtMSw2IDIsOGwwIDBjMSwwIDIsMCAzLDAgMiwwIDQsMCA2LC0xIDIsMCA1LC0yIDcsLTMgMiwtMiA0LC0zIDcsLTQgNywtMyA0LDEgNiw1IDIsMyA1LDMgOSwzIDgsMSAyLDUgMywxMCAxLDEgMiwyIDMsMyAyLDEgMywyIDQsMnoiIC8+PHBhdGggaWQ9Im5nanMyIiBkPSJNMzMxIDM5MGMyLDAgNCwxIDYsMiAyLDEgMiwxIDUsMiAzLDAgMywxIDUsM2wwIDBjNiw1IDksLTEgMTUsNWwwIDAgMSAxYzEsMSA1LDAgNywwIDIsLTEgNCwtMyA2LC00bDEgMGMzLC0yIDMsLTIgMywtNiAwLC0xIC0xLC0xIC0xLC0yIC00LC00IC00LC00IC02LC0xMGwwIDBjLTEsLTMgLTIsLTMgLTUsLTUgLTEsLTEgLTIsLTIgLTMsLTMgLTEsLTUgNSwtOSAtMywtMTAgLTQsMCAtNywwIC05LC0zIC0yLC00IDEsLTggLTYsLTUgLTMsMSAtNSwyIC03LDQgLTIsMSAtNSwzIC03LDMgLTIsMSAtNCwxIC02LDEgLTMsMCAtOCwxIC0xMSwyIC0yLDIgLTQsMyAtNiw1IC0yLDEgLTMsMyAtNCw1IDIsMSA1LC01IDEzLDEgMiwwIDMsMSA0LDIgMiwyIDIsNCA0LDcgMSwyIDIsNCA0LDV6IiAvPjxwYXRoIGlkPSJuZ2pzMjAiIGQ9Ik0yOTEgMjk4bDAgLTFjMSwtMSAwLC0zIDAsLTQgLTEsLTUgMCwtNiAxLC0xMCAxLC0zIDEsLTIgMSwtNSAwLC00IC0xLC0xMCA0LC0xMSAzLDAgNSwwIDgsLTEgMywtMSA2LC0xIDksLTIgMiwwIDQsLTEgNiwtMSAyLC0xIDUsLTIgNywtMSAyLDIgMyw0IDYsNSAzLDIgNSw1IDgsNyAwLC0zIC0xLC02IC0yLC04IDQsLTEgNiwwIDEwLDBsMCAwYzUsLTEgMTMsLTMgMTgsLTEgMSwxIDYsMyA3LDMgMywtMSA1LC01IDUsLTggMSwtMiAyLC00IDMsLTYgMSwtMiAyLC0zIDMsLTUgMSwtNCA0LC04IDYsLTExIDMsLTQgNCwtMyA4LC01IDIsLTEgNCwtMiA1LC00IDMsLTcgNCwtNiA0LC0xNCAwLC0yIDAsLTIgMSwtNCAtNSwtMyAtNywtNiAtMTEsLTkgLTMsLTMgLTMsLTMgLTYsLTQgLTQsLTIgLTgsLTUgLTEyLC03IC0yLC0yIC01LC00IC04LC02IC0zLC0xIC0xMCwtMyAtMTQsLTIgLTEsMSAtMywxIC01LDEgLTIsMSAtMywxIC02LDEgLTYsLTEgLTcsLTIgLTEzLDAgLTMsMSAtNCwyIC03LDIgLTEsMCAtMiwxIC0zLDEgLTQsMCAtNiwyIC05LC0xIDAsLTEgLTMsLTUgLTMsLTUgLTcsLTUgLTYsLTQgLTEyLC0yIC01LDIgLTgsLTEgLTEzLC0yIC01LDAgLTUsLTEgLTksLTMgLTIsLTEgLTQsLTEgLTYsMCAwLDAgLTEsMCAtMSwxIC0xLDAgLTEsMSAtMiwxIC01LDQgLTgsNyAtMTQsOSAtNywxIC0xNCwyIC0xOSw2IC00LDQgLTQsMTAgLTUsMTcgLTEsNiAxLDIzIC0xMCwxNmwwIDBjLTgsLTQgLTEwLC03IC0xOSwxIC0zLDUgLTExLDUgLTE3LDI5bDAgLTFjMSw5IDAsMTYgLTUsMjMgLTEsMiAtMiw1IC00LDcgLTYsNiAtOCwxMyAwLDIzIDIsMSAyLDMgMiw1bC0xIDEgMSAwYzAsMCAxLDAgMSwwIDIsMCAzLC0xIDQsLTQgMSwtMyAyLC03IDIsLTEwIDAsLTQgMCwtNyAzLC0xMSAxLC0yIDQsLTQgNiwtMiAxLDEgMiwzIDMsNCAzLDQgNiw1IDEwLDUgMywwIDYsLTEgOCwyIDEsMCAxLDEgMSwyIDEsMSAxLDIgMSwyIDAsNiAwLDcgLTMsMTMgLTEsMyAwLDYgMyw4IDEsMSA0LDIgNiwzIDIsMSAyLDEgNSwxIDQsMSA2LDIgMTEsMCAwLC0xIDEsLTEgMiwtMSAzLC0yIDUsLTMgOCwtNSAzLC0xIDUsLTQgOSwtNSAyLC0yIDQsLTIgNywtMyAyLC0xIDQsLTIgNywtMyAzLDAgNSwtMSA4LC0zIDQsLTIgNiwtMiA5LC02IDAsMCAxLC0xIDIsLTJ6bS0xMTMgMTVsMCAwIDEgMGMtMSwwIC0xLDAgLTEsMHoiIC8+PHBhdGggaWQ9Im5nanMxOCIgZD0iTTIxNiAxMjljMSwtNSAxLC00IDAsLTggMCwtMiAtMSwtOCAwLC0xMCAxLC0xIDQsLTIgNiwtMyA2LC0yIDcsMiAxMywybDEgMCAwIDBjMywtMSA0LC0yIDYsLTQgMywtMSA1LC0yIDgsLTMgMiwtMSA0LC0yIDYsLTIgNSwtMSA3LDEgMTIsMSAzLC0xIDQsLTEgNywwIDEsMSAzLDIgNCwyIDIsMSA0LDIgNiwyIDEsMCAzLC0zIDQsLTQgMCwtMSAxLC0yIDIsLTMgMiwwIDIsMyA0LDEgMiwtMSAzLC0yIDQsLTMgMSwwIDEsLTEgMiwtMSAxLDAgMSwwIDIsMCAxLDAgMSw0IDEsNiAwLDEgMCwyIDAsMyAwLDQgMCw1IDAsOCAwLDEgMCwxIDAsMiAwLDUgLTEsNiAtNCw5IC0xLDIgLTIsMyAtMiw1IC0xLDIgLTEsMyAtMSw1bDAgMGMwLDAgMSwyIDEsMyAxLDUgMSw1IDQsMTEgMywzIDAsNSAwLDkgLTEsMiAtMiwyIC00LDMgLTUsMiAtNSwxIC0xMCwxIC0yLDAgLTQsMCAtNiwxbDAgMWMtMiwxIC0zLDIgLTQsNCAtMiwyIC01LDcgLTcsOSAtMSwwIC0xLDEgLTIsMSAtNSw0IC04LDcgLTE0LDkgLTcsMSAtMTQsMiAtMTksNiAtNCw0IC00LDEwIC01LDE3IC0xLDYgMSwyMyAtMTAsMTZsMCAwYy04LC00IC0xMCwtNyAtMTksMSAtMyw1IC0xMSw1IC0xNywyOSAtMTMsLTkgLTE1LC0yNCAtMTUsLTMzbDAgLTE5IDE3IDEgMyAtMTZjMCwtMiAxMiwtMiAxNywtNSA0LC01IDYsMiAxNSwtNSA3LC01IDksLTcgNywtMTcgLTEsLTEgLTEsLTIgLTEsLTMgLTEsLTIgLTMsLTQgLTUsLTUgLTIsLTIgLTUsLTUgLTcsLTggMCwtMSAtMSwtMiAtMSwtMyAwLC0yIDEsLTUgMSwtNyAwLC0yIDAsLTQgMCwtNnoiIC8+PHBhdGggaWQ9Im5nanMyMiIgZD0iTTM2MiAxODNjMCwtMiAtMSwtMyAtMSwtNSAtMiwtNCAtMiwtOSAtMywtMTQgLTEsLTQgLTMsLTUgLTMsLTEwIDAsLTMgMCwtNSAwLC04IDAsLTYgMSwtMTAgLTIsLTE0IC0yLC0yIC0zLC0zIC01LC01IC0yLC0zIC0yLC01IC0zLC04IDAsLTIgLTIsLTUgLTIsLTYgLTEsLTMgLTMsLTUgLTUsLTcgLTIsLTIgLTQsMCAtNiwyIC0yLDEgLTIsMiAtNSwxIC03LC0yIC03LC0zIC0xNCwtMiAtNCwwIC02LDEgLTksMiAwLDIgMCwzIDAsNCAwLDEgMCwxIDAsMiAwLDUgLTEsNiAtNCw5IC0xLDIgLTIsMyAtMiw1IC0xLDIgLTEsMyAtMSw1bDAgMGMwLDAgMSwyIDEsMyAxLDUgMSw1IDQsMTEgMywzIDAsNSAwLDkgLTEsMiAtMiwyIC00LDMgLTUsMiAtNSwxIC0xMCwxIC0yLDAgLTQsMCAtNiwxbDAgMWMtMiwxIC0zLDIgLTQsNCAtMiwyIC00LDUgLTYsOCAyLC0xIDQsLTEgNiwwIDQsMiA0LDMgOSwzIDUsMSA4LDQgMTMsMiA2LC0yIDUsLTMgMTIsMiAwLDAgMyw0IDMsNSAzLDMgNSwxIDksMSAxLDAgMiwtMSAzLC0xIDMsMCA0LC0xIDcsLTIgNiwtMiA3LC0xIDEzLDAgMywwIDQsMCA2LC0xIDIsMCA0LDAgNSwtMSAxLDAgMywwIDQsMHoiIC8+PHBhdGggaWQ9Im5nanMxNSIgZD0iTTM4NyAzMTJsMSAwYzEsLTMgNCwtOCA0LC04IDIsLTMgMiwtNiA2LC05IDMsLTEgOCwtMSAxMSwwIDYsMSA0LDAgOSwtMSA0LC0xIDMsMSA2LC0yIDMsLTIgNiwxIDcsMyAzLDIgMiwzIDYsMyAxLDAgNCwwIDQsMiAyLC0xIDIsLTIgMiwtNSAtMiwtNCAtNCwtMyAtNSwtOSAwLC0zIC0yLC05IDEsLTEyIDMsLTQgNCwtNiA0LC0xMiAtMSwtNSAxLC03IDEsLTExIDEsLTQgMSwtMTIgLTMsLTEzIC0zLDAgLTUsNCAtNiw2IC02LDcgLTksNiAtMTcsNyAtMywwIC01LDAgLTgsMCAtMiwwIC02LC0zIC05LC00IC0zLC0zIDAsLTQgLTEsLTggMCwtMiAtMSwtNCAtMSwtNmwwIDBjLTQsMiAtNSwxIC04LDUgLTIsMyAtNSw3IC02LDExIC0xLDIgLTIsMyAtMyw1IC0xLDIgLTIsNCAtMyw2IDAsMyAtMiw3IC01LDggLTEsMCAtNiwtMiAtNywtMyAtNSwtMiAtMTMsMCAtMTgsMWwwIDBjLTQsMCAtNiwtMSAtMTAsMCAxLDIgMSw1IDIsN2wwIDBjMywyIDUsNCA4LDYgMywyIDQsMiA4LDUgMiwyIDMsNCA0LDcgMSwxIDEsMiAyLDMgMSwzIDIsNyA0LDEwIDEsMSAyLDIgMywybDEgMCAwIDBjMywwIDMsLTEgNSwtMiAzLC0yIDQsMCA3LDEgMSwxIDEsMSAyLDFsMSAxYzAsMCAyLDAgMiwwIDAsMCAtMSw0IC0xLDV6IiAvPjxwYXRoIGlkPSJuZ2pzMTEiIGQ9Ik01MTMgMjk1Yy0yLDEgLTMsMSAtNiwxIC0yLDAgLTUsMSAtNywxIC0xLDAgLTMsMSAtNSwxIC0yLDEgLTMsMCAtNCwxIC00LDEgLTMsMyAtMyw3IDAsNSAtMiw2IC00LDEwIDAsMCAwLDAgMCwwIC0zLDAgLTYsMSAtOSwxIC0zLDAgLTUsMCAtNywzIC0zLDMgLTQsMSAtOCwwIC0xLDAgLTIsMCAtNCwwIC0zLDAgLTUsMSAtNywwIC0yLDAgLTEsLTIgMCwtMyAyLC00IDIsLTUgLTEsLTkgLTIsLTIgLTUsLTMgLTgsLTQgLTEsMCAtMSwwIC0xLDAgMSwtMSAyLC0yIDIsLTMgMCwtMSAwLC0xIDAsLTFsMCAwYzIsLTEgMiwtMiAyLC01IC0yLC00IC00LC0zIC01LC05IDAsLTMgLTIsLTkgMSwtMTIgMywtNCA0LC02IDQsLTEyIDAsMCAwLC0xIDAsLTIgMiwwIDQsMSA3LDEgNSwxIDIwLDIgMjUsMSA3LC00IDQsLTUgOSwtOSAyLC0xIDIsMSA1LDIgNywyIDEzLDAgMTUsOCA0LDkgOCw2IDEyLDEyIDIsNSAyLDExIDAsMTUgLTEsMSAtMiwzIC0zLDV6IiAvPjxwYXRoIGlkPSJuZ2pzMTMiIGQ9Ik00ODYgMjg1YzIsLTQgMiwtMyAzLC03IDEsLTQgMywtNyA3LC03IDcsLTEgMTAsNSAxMywxMCAyLDIgMyw1IDEsNyAtMiwyIC04LC0xIC0xMiwwIC00LDEgLTgsNCAtMTIsMSAtMiwtMSAtMiwtMyAwLC00eiIgLz48cGF0aCBpZD0ibmdqczI2IiBkPSJNNjAwIDMzNWMwLDEgMCwxIDAsMmwzIDJjMCwzIDAsNiAxLDggMCw1IDAsMTAgMSwxNSAwLDAgLTEsMSAtMSwyIDAsLTEgMCwtMSAxLC0yIDMsLTQgNiwtNyA4LC0xMSAzLC01IDYsLTggOSwtMTIgMywtNCAzLC01IC0yLC00IC00LDEgLTYsMiAtNSwtNCAxLC0xIDEsLTIgMSwtMyAtMSwtMyAtMSwtOCAtNiwtNCAtMiwyIC0zLDMgLTUsNSAtMSwwIC0xLDAgLTIsMSAtMiwxIC0xLDAgLTIsMiAwLDEgLTEsMiAtMSwzeiIgLz48cGF0aCBpZD0ibmdqczI1IiBkPSJNNjAzIDMzOWwtNyAtNSAtOCA5YzEsNCAxLDQgLTEsOCAtMyw1IDEsOCA1LDExIDMsMyA4LDEwIDExLDQgMCwtMSAyLC00IDIsLTQgLTEsLTUgLTEsLTEwIC0xLC0xNSAtMSwtMiAtMSwtNSAtMSwtOHoiIC8+PC9nPjxnIGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWxzIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAtMjQ5Ljc4OSAzMy41MTU3KSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPkJPUkdVIEwuRy5BPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAtNjUuMjYyOCAtMTA5LjkwMykiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5SSUpBVTwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44ODc4NDYgMCAwIDEgLTEzMi4zMTggLTQ5LjIyNTkpIj48dGV4dCBjbGFzcz0iaW5pc3RtYXAtc291cmNlLWxhYmVsIiB4PSIzMTYiIHk9IjEzOCI+QUdXQVJBPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAtMTMyLjMxOCAtNDkuMjI1OSkiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjMzMCIgeT0iMTU2Ij5MLkcuQTwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44ODc4NDYgMCAwIDEgNjcuNDY2MiAtNTkuMjU0NykiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5NQVJJR0E8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuODg3ODQ2IDAgMCAxIDExMi4wNjggNTkuODczNCkiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5SQUZJPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAyMzYuNzc1IDE5OS45ODMpIj48dGV4dCBjbGFzcz0iaW5pc3RtYXAtc291cmNlLWxhYmVsIiB4PSIzNTAiIHk9IjEzOCI+R1VSQVJBPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAyNzMuMzE1IDI0MC44MDIpIj48dGV4dCBjbGFzcz0iaW5pc3RtYXAtc291cmNlLWxhYmVsIiB4PSIzNTAiIHk9IjEzOCI+U1VMRUpBPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSA3NS42NjE2IDI4Mi43MDQpIj48dGV4dCBjbGFzcz0iaW5pc3RtYXAtc291cmNlLWxhYmVsIiB4PSIzNTAiIHk9IjEzOCI+TEFWVU48L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuODg3ODQ2IDAgMCAxIDE4NS45ODQgMzIxLjI5NykiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5MQVBBSTwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44ODc4NDYgMCAwIDEgMTU1LjA5NCAyNzEuNjMyKSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPkFHQUk8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuODg3ODQ2IDAgMCAxIDEyNS4zMDcgMjA0LjMxNikiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5LQVRDSEE8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuODg3ODQ2IDAgMCAxIDE5NS4zMzYgNDIuMTIyNikiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5TSElST1JPPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAyNDYuNjYxIDExMS42MDUpIj48dGV4dCBjbGFzcz0iaW5pc3RtYXAtc291cmNlLWxhYmVsIiB4PSIzNTAiIHk9IjEzOCI+TVVZQTwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44ODc4NDYgMCAwIDEgMTcuMDUyNyAyMDAuMDIyKSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPkdCQUtPPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAyNC42MDM0IDI1MS44NTQpIj48dGV4dCBjbGFzcz0iaW5pc3RtYXAtc291cmNlLWxhYmVsIiB4PSIzNTAiIHk9IjEzOCI+RURBVEk8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuODg3ODQ2IDAgMCAxIC0xMDIuNSAxMS40NTE0KSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPk1BR0FNQTwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44ODc4NDYgMCAwIDEgLTYyLjI0MTEgOTQuMTUyOSkiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5NQVNIRUdVPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAtODIuMDk5MSAyMDYuNjYyKSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPk1PS1dBPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAtMTguMTEyMyA5LjIyNDg0KSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPktPTlRBR09SQTwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44ODc4NDYgMCAwIDEgNTQuNzAwNSAxNDIuNjM1KSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPldVU0hJU0hJPC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg4Nzg0NiAwIDAgMSAxMjYuNzMgMTUxLjQ0MSkiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5CT1NTTzwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44ODc4NDYgMCAwIDEgMTkxLjczMiAxODYuMDg4KSI+PHRleHQgY2xhc3M9ImluaXN0bWFwLXNvdXJjZS1sYWJlbCIgeD0iMzUwIiB5PSIxMzgiPlBBSUtPUk88L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuODg3ODQ2IDAgMCAxIDE0My4yOTQgMTI2LjA2NykiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5DSEFOQ0hBR0E8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuODg3ODQ2IDAgMCAxIDg2LjY5MzcgMTkzLjI2NCkiPjx0ZXh0IGNsYXNzPSJpbmlzdG1hcC1zb3VyY2UtbGFiZWwiIHg9IjM1MCIgeT0iMTM4Ij5CSURBPC90ZXh0PjwvZz48L2c+PC9zdmc+Cg=='
  ), (character) => character.charCodeAt(0)));

  const FEATURES = {
    ngjs1:'Mokwa', ngjs2:'Edati', ngjs3:'Lavun', ngjs4:'Katcha', ngjs5:'Lapai',
    ngjs6a:'Paikoro', ngjs7:'Gurara', ngjs9:'Bida', ngjs10:'Gbako', ngjs11:'Bosso',
    ngjs12:'Muya', ngjs13:'Chanchaga', ngjs14:'Shiroro', ngjs15:'Wushishi', ngjs16:'Rafi',
    ngjs17:'Mariga', ngjs18:'Magama', ngjs19:'Agwara', ngjs20:'Mashegu', ngjs21:'Borgu',
    ngjs22:'Kontagora', ngjs23:'Rijau', ngjs24:'Agai', ngjs25:'Suleja', ngjs26:'Tafa'
  };

  const DEFAULTS = {
    mapUrl: null,
    title: 'Niger State',
    data: {},
    featureMap: null,
    valueLabel: 'Value',
    colors: ['#e8f3f1', '#087f72'],
    scaleType: 'linear',
    classes: 5,
    showLegend: true,
    showSearch: true,
    showStats: true,
    showLabels: false,
    labelMode: 'value',
    showControls: true,
    wheelZoom: true,
    wheelSensitivity: 20,
    minZoom: 0,
    maxZoom: 8,
    panOverscroll: 0.12,
    extrusionDepth: 0,
    extrusionColor: '#25334a',
    zoomOnSelect: false,
    popover: false,
    popoverTrigger: 'both',
    wardDrilldown: false,
    wardDataUrl: null,
    wardGeoJSON: null,
    wardData: {},
    redirectOnFeatureClick: false,
    redirectTarget: '_self',
    theme: 'light',
    compact: false,
    variant: 'card',
    pins: [],
    onFeatureClick: null,
    onFeatureHover: null,
    onViewportChange: null,
    onReady: null,
    onError: null
  };

  const normalize = (value) => String(value || '').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

  const contrastingLabelColors = (color) => {
    let rgb = null;
    const hex = String(color || '').match(/^#([\da-f]{3}|[\da-f]{6})$/i);
    if (hex) {
      const value = hex[1].length === 3 ? [...hex[1]].map((part) => part + part).join('') : hex[1];
      rgb = value.match(/.{2}/g).map((part) => parseInt(part, 16));
    } else {
      const channels = String(color || '').match(/^rgba?\(([^)]+)\)$/i)?.[1].match(/[\d.]+/g);
      if (channels?.length >= 3) rgb = channels.slice(0, 3).map(Number);
    }
    if (!rgb) return { fill:'#fff', stroke:'rgba(10,18,28,.72)' };
    const luminance = rgb.map((channel) => {
      const value = channel / 255;
      return value <= .04045 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
    }).reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
    return luminance > .48
      ? { fill:'#17252b', stroke:'rgba(255,255,255,.82)' }
      : { fill:'#fff', stroke:'rgba(9,17,28,.78)' };
  };

  class INISTMap {
    constructor(target, options) {
      this.container = typeof target === 'string' ? document.querySelector(target) : target;
      if (!this.container) throw new Error('INISTMap: mount element was not found.');
      this.options = Object.assign({}, DEFAULTS, options || {});
      this.featureMap = this.options.featureMap || FEATURES;
      this.instanceId = 'inistmap-options-' + INISTMap._nextId++;
      this.data = this.options.data || {};
      this._mainMapTitle = this.options.title;
      this._mapLevel = 'lgas';
      this.features = [];
      this.pinNodes = new Map();
      this.selectedId = null;
      this.destroyed = false;
      this.pointers = new Map();
      this.abortController = new AbortController();
      this.container.classList.add('inistmap');
      this.container.setAttribute('aria-label', this.options.title + ' interactive map');
      this.container.setAttribute('aria-busy', 'true');
      this._renderShell();
      this.ready = this._load();
    }

    _renderShell() {
      this.container.replaceChildren();
      const shell = document.createElement('section');
      shell.className = 'inistmap-shell' + (this.options.compact ? ' inistmap-compact' : '') + (this.options.variant === 'plain' ? ' inistmap-plain' : '') + (this.options.theme === 'dark' ? ' inistmap-dark' : '');
      shell.innerHTML = '<header class="inistmap-header"><div><p class="inistmap-eyebrow">INTERACTIVE MAP</p><h2 class="inistmap-title"></h2><p class="inistmap-subtitle">Explore local data by local government area.</p></div><div class="inistmap-header-actions"><label class="inistmap-search-wrap"><span>Find an LGA</span><input class="inistmap-search" type="search" placeholder="Search LGAs" autocomplete="off" list="inistmap-options"><datalist class="inistmap-options"></datalist></label><div class="inistmap-tools" role="toolbar" aria-label="Map controls"><button type="button" data-action="back-to-lgas" aria-label="Back to all LGAs" title="Back to all LGAs" hidden>← LGAs</button><button type="button" data-action="zoom-out" aria-label="Zoom out" title="Zoom out">−</button><output class="inistmap-zoom-level" aria-live="polite">100%</output><button type="button" data-action="zoom-in" aria-label="Zoom in" title="Zoom in">+</button><button type="button" data-action="fit-selection" aria-label="Focus selected area" title="Focus selected area" disabled>Focus</button><button type="button" data-action="reset" aria-label="Reset map view" title="Reset map view">Reset</button><button type="button" data-action="fullscreen" aria-label="Enter fullscreen" title="Fullscreen">⛶</button><button type="button" data-action="export-svg" title="Download SVG">SVG</button><button type="button" data-action="export-png" title="Download PNG">PNG</button></div></div></header><div class="inistmap-content"><div class="inistmap-stage" role="region" aria-label="Map. Use plus and minus to zoom, drag to pan, and select an area for details."></div><aside class="inistmap-aside"><div class="inistmap-stats"></div><div class="inistmap-legend"></div><div class="inistmap-detail" aria-live="polite"><p class="inistmap-detail-kicker">SELECT AN AREA</p><h3 class="inistmap-detail-name">Niger State</h3><p class="inistmap-detail-copy">Choose an LGA on the map or use the search box to see its details.</p></div></aside></div><p class="inistmap-status" role="status" aria-live="polite">Loading map…</p></section>';
      this.container.append(shell);
      this.shell = shell;
      this.stage = shell.querySelector('.inistmap-stage');
      this.search = shell.querySelector('.inistmap-search');
      this.search.setAttribute('list', this.instanceId);
      this.stats = shell.querySelector('.inistmap-stats');
      this.legend = shell.querySelector('.inistmap-legend');
      this.detail = shell.querySelector('.inistmap-detail');
      this.status = shell.querySelector('.inistmap-status');
      this.tools = shell.querySelector('.inistmap-tools');
      this.zoomLevel = shell.querySelector('.inistmap-zoom-level');
      if (this.options.variant === 'plain') {
        this.stage.append(this.tools);
        this.tools.classList.add('inistmap-tools-overlay');
      }
      shell.querySelector('.inistmap-title').textContent = this.options.title;
      shell.querySelector('.inistmap-detail-name').textContent = this.options.title;
      shell.querySelector('.inistmap-search-wrap').hidden = !this.options.showSearch;
      this.tools.hidden = !this.options.showControls;
      this._bindControls();
      this.search.addEventListener('input', () => {
        const query = normalize(this.search.value);
        this.features.forEach((feature) => {
          feature.node.classList.toggle('inistmap-muted', query && !normalize(feature.name).includes(query));
        });
      });
    }

    _bindControls() {
      this.tools.addEventListener('click', async (event) => {
        const button = event.target.closest('button[data-action]');
        if (!button) return;
        const action = button.dataset.action;
        if (action === 'back-to-lgas') { this.backToLGAs(); return; }
        if (action === 'zoom-in') this.zoomBy(1.2, undefined, undefined, true);
        if (action === 'zoom-out') this.zoomBy(1 / 1.2, undefined, undefined, true);
        if (action === 'reset') this.resetView();
        if (action === 'fit-selection' && this.selectedId) this.zoomTo(this.selectedId);
        if (action === 'fullscreen') await this.toggleFullscreen();
        if (action === 'export-svg' || action === 'export-png') {
          button.disabled = true;
          try { await this.export(action === 'export-png' ? 'png' : 'svg'); }
          catch (error) { this.status.textContent = 'Could not export the map: ' + error.message; }
          finally { button.disabled = false; button.closest('details')?.removeAttribute('open'); }
        }
      });
      this.search.addEventListener('change', () => {
        const feature = this.features.find((item) => normalize(item.name) === normalize(this.search.value));
        if (!feature) return;
        if (this._mapLevel === 'lgas' && this.options.wardDrilldown) this._activateFeature(feature);
        else { this.select(feature.id); this.zoomTo(feature.name); }
      });
      this._onFullscreenChange = () => {
        const button = this.tools.querySelector('[data-action="fullscreen"]');
        const active = document.fullscreenElement === this.container;
        button.setAttribute('aria-label', active ? 'Exit fullscreen' : 'Enter fullscreen');
        button.title = active ? 'Exit fullscreen' : 'Fullscreen';
      };
      this.container.addEventListener('fullscreenchange', this._onFullscreenChange);
    }

    _bindNavigation() {
      this._navigationController?.abort();
      this._navigationController = new AbortController();
      const signal = this._navigationController.signal;
      const bounds = this.svg.viewBox.baseVal;
      this.baseViewBox = { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height };
      this.viewBox = { ...this.baseViewBox };
      this.stage.addEventListener('wheel', (event) => {
        if (!this.options.wheelZoom || !event.deltaY) return;
        event.preventDefault();
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this.stage.clientHeight : 1;
        const delta = Math.max(-600, Math.min(600, event.deltaY * unit));
        const magnitude = Math.abs(delta);
        const sensitivity = Math.max(0.1, Math.min(20, Number(this.options.wheelSensitivity) || 1));
        const gain = event.ctrlKey ? 0.00032 : event.deltaMode !== 0 || magnitude >= 80 ? 0.0006 : 0.00025;
        const factor = Math.max(Math.exp(-0.12), Math.min(Math.exp(0.12), Math.exp(-delta * gain * sensitivity)));
        const source = this._wheelTargetBox || this._animationTargetBox || this.viewBox;
        this._cancelViewAnimation();
        this._wheelTargetBox = this._constrainViewBox(this._zoomedBox(factor, event.clientX, event.clientY, source));
        this._startWheelZoom();
      }, { passive: false, signal });

      this._onPointerDown = (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        if (event.target.closest?.('.inistmap-pin')) return;
        this._cancelWheelZoom();
        this._cancelViewAnimation();
        this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        this.stage.classList.add('inistmap-gesture-active');
        if (this.pointers.size === 1) {
          this._gestureMoved = false;
          this.drag = { x: event.clientX, y: event.clientY, viewBox: { ...this.viewBox }, moved: false };
        } else if (this.pointers.size === 2) {
          const points = [...this.pointers.values()];
          this.pinch = { distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) };
          this.drag = null;
        }
      };
      this._onPointerMove = (event) => {
        if (!this.pointers.has(event.pointerId)) return;
        this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        if (event.cancelable) event.preventDefault();
        if (this.pointers.size > 1) {
          try { this.svg.setPointerCapture(event.pointerId); } catch (_) { /* Pointer capture is optional. */ }
          const points = [...this.pointers.values()];
          const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
          if (this.pinch?.distance && distance) {
            const centerX = (points[0].x + points[1].x) / 2;
            const centerY = (points[0].y + points[1].y) / 2;
            this.zoomBy(distance / this.pinch.distance, centerX, centerY);
            this.pinch.distance = distance;
            this.drag = null;
            this._gestureMoved = true;
          }
          return;
        }
        if (!this.drag) return;
        const dx = event.clientX - this.drag.x;
        const dy = event.clientY - this.drag.y;
        if (!this.drag.moved && Math.hypot(dx, dy) < 6) return;
        if (!this.drag.moved) {
          try { this.svg.setPointerCapture(event.pointerId); } catch (_) { /* Pointer capture is optional. */ }
        }
        this.drag.moved = true;
        this._gestureMoved = true;
        const rect = this.svg.getBoundingClientRect();
        const scale = Math.min(rect.width / this.drag.viewBox.width, rect.height / this.drag.viewBox.height);
        if (!scale) return;
        this._setViewBox({
          ...this.drag.viewBox,
          x: this.drag.viewBox.x - dx / scale,
          y: this.drag.viewBox.y - dy / scale
        });
      };
      this._onPointerUp = (event) => {
        if (!this.pointers.has(event.pointerId)) return;
        if (this._gestureMoved) {
          this._suppressNextClick = true;
          setTimeout(() => { this._suppressNextClick = false; }, 0);
        }
        this.pointers.delete(event.pointerId);
        this.pinch = null;
        if (this.pointers.size === 1) {
          const point = [...this.pointers.values()][0];
          this.drag = { x: point.x, y: point.y, viewBox: { ...this.viewBox }, moved: true };
        } else if (this.pointers.size === 0) {
          this.drag = null;
          this._gestureMoved = false;
          this.stage.classList.remove('inistmap-gesture-active');
        }
      };
      this.svg.addEventListener('pointerdown', this._onPointerDown, { signal });
      document.addEventListener('pointermove', this._onPointerMove, { signal });
      document.addEventListener('pointerup', this._onPointerUp, { signal });
      document.addEventListener('pointercancel', this._onPointerUp, { signal });
      this.svg.addEventListener('keydown', (event) => {
        if (event.key === '+' || event.key === '=') { event.preventDefault(); this.zoomBy(1.2, undefined, undefined, true); }
        if (event.key === '-') { event.preventDefault(); this.zoomBy(1 / 1.2, undefined, undefined, true); }
        if (event.key === '0' || event.key === 'Home') { event.preventDefault(); this.resetView(); }
        if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) {
          const index = this.features.findIndex((feature) => feature.node === document.activeElement);
          const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
          const next = this.features[(index + step + this.features.length) % this.features.length];
          if (next) { event.preventDefault(); next.node.focus(); }
        }
      }, { signal });
      if (this.options.popover && this.options.popoverTrigger === 'contextmenu') {
        this.svg.addEventListener('contextmenu', (event) => {
          event.preventDefault();
          const target = event.target.closest?.('.inistmap-feature, .inistmap-feature-label');
          if (!target) return;
          const featureId = target.getAttribute('data-inistmap-id') || target.getAttribute('data-feature-id');
          const feature = this.features.find((item) => item.id === featureId);
          if (!feature) return;
          this._showPopover(feature);
        }, { signal });
      }
      this._updateZoomLabel();
    }

    _cancelViewAnimation() {
      if (this._viewAnimation?.frame) cancelAnimationFrame(this._viewAnimation.frame);
      this._viewAnimation = null;
      this._animationTargetBox = null;
    }

    _cancelWheelZoom() {
      if (this._wheelFrame) cancelAnimationFrame(this._wheelFrame);
      this._wheelFrame = 0;
      this._wheelTargetBox = null;
    }

    _startWheelZoom() {
      if (this._wheelFrame || !this._wheelTargetBox) return;
      let last = performance.now();
      const tick = (now) => {
        const target = this._wheelTargetBox;
        if (!target || this.destroyed) { this._wheelFrame = 0; return; }
        const elapsed = Math.max(1, Math.min(80, now - last));
        last = now;
        const amount = 1 - Math.exp(-elapsed / 58);
        const current = this.viewBox;
        const next = {
          x: current.x + (target.x - current.x) * amount,
          y: current.y + (target.y - current.y) * amount,
          width: current.width + (target.width - current.width) * amount
        };
        const remaining = Math.max(Math.abs(target.x - next.x), Math.abs(target.y - next.y), Math.abs(target.width - next.width));
        if (remaining < .08) {
          this._setViewBox(target);
          this._wheelFrame = 0;
          this._wheelTargetBox = null;
          return;
        }
        this._setViewBox(next);
        this._wheelFrame = requestAnimationFrame(tick);
      };
      this._wheelFrame = requestAnimationFrame(tick);
    }

    _constrainViewBox(box) {
      const base = this.baseViewBox;
      const maxZoom = Math.max(1, Number(this.options.maxZoom) || 8);
      const configuredMinZoom = Number(this.options.minZoom);
      const minZoom = Number.isFinite(configuredMinZoom) && configuredMinZoom >= 0 ? configuredMinZoom : 1;
      const minWidth = base.width / maxZoom;
      const maxWidth = minZoom === 0 ? base.width * 1000 : base.width / Math.min(minZoom, maxZoom);
      const width = Math.max(minWidth, Math.min(maxWidth, box.width));
      const height = width * base.height / base.width;
      const overscroll = Math.max(0, Number(this.options.panOverscroll) || 0);
      const marginX = width * overscroll;
      const marginY = height * overscroll;
      return {
        x: Math.max(base.x - marginX, Math.min(base.x + base.width - width + marginX, box.x)),
        y: Math.max(base.y - marginY, Math.min(base.y + base.height - height + marginY, box.y)),
        width,
        height
      };
    }

    _zoomedBox(factor, clientX, clientY, source) {
      if (!this.svg || !source || !Number.isFinite(factor) || factor <= 0) return source;
      const rect = this.svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return source;
      const x = clientX == null ? rect.left + rect.width / 2 : clientX;
      const y = clientY == null ? rect.top + rect.height / 2 : clientY;
      const scale = Math.min(rect.width / source.width, rect.height / source.height);
      const offsetX = (rect.width - source.width * scale) / 2;
      const offsetY = (rect.height - source.height * scale) / 2;
      const px = Math.max(0, Math.min(1, (x - rect.left - offsetX) / (source.width * scale)));
      const py = Math.max(0, Math.min(1, (y - rect.top - offsetY) / (source.height * scale)));
      const width = source.width / factor;
      const height = width * this.baseViewBox.height / this.baseViewBox.width;
      return {
        x: source.x + (source.width - width) * px,
        y: source.y + (source.height - height) * py,
        width,
        height
      };
    }

    _animateViewBox(box, duration = 180) {
      this._cancelWheelZoom();
      if (duration <= 0 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return this._setViewBox(box);
      if (this._viewAnimation?.frame) cancelAnimationFrame(this._viewAnimation.frame);
      const start = { ...this.viewBox };
      const animation = { from:start, to:box, started:performance.now(), duration, frame:0 };
      this._viewAnimation = animation;
      this._animationTargetBox = box;
      const tick = (now) => {
        if (this._viewAnimation !== animation) return;
        const progress = Math.min(1, (now - animation.started) / animation.duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const target = animation.to;
        this._setViewBox({
          x: animation.from.x + (target.x - animation.from.x) * eased,
          y: animation.from.y + (target.y - animation.from.y) * eased,
          width: animation.from.width + (target.width - animation.from.width) * eased
        }, true);
        if (progress < 1) animation.frame = requestAnimationFrame(tick);
        else {
          this._viewAnimation = null;
          this._animationTargetBox = null;
        }
      };
      animation.frame = requestAnimationFrame(tick);
      return this;
    }

    _setViewBox(box, fromAnimation = false) {
      if (!fromAnimation) this._cancelViewAnimation();
      if (!this.svg || !this.baseViewBox) return this;
      const base = this.baseViewBox;
      const { x, y, width, height } = this._constrainViewBox(box);
      this.viewBox = { x, y, width, height };
      this.svg.setAttribute('viewBox', [x, y, width, height].join(' '));
      this._updateZoomLabel();
      this._positionPopover();
      const detail = { zoom: base.width / width, viewBox: { ...this.viewBox } };
      if (typeof this.options.onViewportChange === 'function') this.options.onViewportChange(detail);
      this._emit('inistmap:viewport', detail);
      return this;
    }

    _updateZoomLabel() {
      if (this.zoomLevel && this.baseViewBox && this.viewBox) {
        this.zoomLevel.value = Math.round(this.baseViewBox.width / this.viewBox.width * 100) + '%';
      }
    }

    zoomBy(factor, clientX, clientY, animate = false) {
      if (!this.svg || !this.viewBox) return this;
      this._cancelWheelZoom();
      const source = this._animationTargetBox || this.viewBox;
      const target = this._zoomedBox(factor, clientX, clientY, source);
      return animate ? this._animateViewBox(target) : this._setViewBox(target);
    }

    resetView(animate = true) {
      if (this.baseViewBox) animate ? this._animateViewBox(this.baseViewBox, 240) : this._setViewBox(this.baseViewBox);
      return this;
    }

    zoomTo(nameOrId, padding = 1.35, animate = true) {
      const query = normalize(nameOrId);
      const matches = this.features.filter((feature) => normalize(feature.id) === query || normalize(feature.name) === query);
      if (!matches.length) return this;
      const boxes = matches.map((feature) => feature.node.getBBox());
      const x = Math.min(...boxes.map((box) => box.x));
      const y = Math.min(...boxes.map((box) => box.y));
      const right = Math.max(...boxes.map((box) => box.x + box.width));
      const bottom = Math.max(...boxes.map((box) => box.y + box.height));
      let width = (right - x) * padding;
      let height = (bottom - y) * padding;
      const aspect = this.baseViewBox.width / this.baseViewBox.height;
      if (width / height < aspect) width = height * aspect;
      else height = width / aspect;
      const target = { x: (x + right) / 2 - width / 2, y: (y + bottom) / 2 - height / 2, width, height };
      return animate ? this._animateViewBox(target, 260) : this._setViewBox(target);
    }

    async toggleFullscreen() {
      try {
        if (document.fullscreenElement === this.container) await document.exitFullscreen();
        else await this.container.requestFullscreen();
      } catch (error) {
        this.status.textContent = 'Fullscreen is unavailable in this browser.';
      }
      return this;
    }

    async export(format = 'svg') {
      if (!this.svg) return null;
      const clone = this.svg.cloneNode(true);
      clone.setAttribute('xmlns', SVG_NS);
      clone.setAttribute('width', '1600');
      clone.setAttribute('height', String(Math.round(1600 * this.viewBox.height / this.viewBox.width)));
      const copiedById = new Map([...clone.querySelectorAll('[id]')].map((node) => [node.id, node]));
      this.features.forEach((feature) => {
        const copied = copiedById.get(feature.id);
        if (!copied) return;
        const style = getComputedStyle(feature.node);
        copied.style.fill = style.fill;
        copied.style.stroke = style.stroke;
        copied.style.strokeWidth = style.strokeWidth;
        copied.style.strokeLinejoin = style.strokeLinejoin;
        copied.style.vectorEffect = 'non-scaling-stroke';
      });
      const markup = new XMLSerializer().serializeToString(clone);
      const svgBlob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
      const filename = (this.options.title || 'inistmap').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'inistmap';
      if (format === 'svg') return this._download(svgBlob, filename + '.svg');
      if (format !== 'png') throw new Error('Choose svg or png.');
      const url = URL.createObjectURL(svgBlob);
      try {
        const image = new Image();
        image.src = url;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = 1600;
        canvas.height = Math.round(1600 * this.viewBox.height / this.viewBox.width);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        const png = await new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('PNG encoding failed.')), 'image/png'));
        return this._download(png, filename + '.png');
      } finally { URL.revokeObjectURL(url); }
    }

    _download(blob, filename) {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return blob;
    }

    _wardBoundaryRings(features) {
      const edges = new Map();
      const pointKey = ([longitude, latitude]) => longitude + ',' + latitude;
      const edgeKey = (start, end) => pointKey(start) + '>' + pointKey(end);
      const collectRings = (coordinates, callback) => {
        if (!Array.isArray(coordinates)) return;
        if (Array.isArray(coordinates[0]) && typeof coordinates[0][0] === 'number') callback(coordinates);
        else coordinates.forEach((coordinate) => collectRings(coordinate, callback));
      };
      features.forEach((feature) => {
        collectRings(feature.geometry?.coordinates, (ring) => {
          for (let index = 0; index < ring.length - 1; index++) {
            const start = ring[index].slice(0, 2);
            const end = ring[index + 1].slice(0, 2);
            if (start[0] === end[0] && start[1] === end[1]) continue;
            const key = edgeKey(start, end);
            const reverse = edgeKey(end, start);
            if (edges.has(reverse)) edges.delete(reverse);
            else if (!edges.has(key)) edges.set(key, { key, start, end });
          }
        });
      });
      const outgoing = new Map();
      edges.forEach((edge) => {
        const key = pointKey(edge.start);
        if (!outgoing.has(key)) outgoing.set(key, []);
        outgoing.get(key).push(edge);
      });
      const unused = new Set(edges.keys());
      const rings = [];
      const chooseNext = (incoming, candidates) => {
        const angle = (start, end) => Math.atan2(end[1] - start[1], end[0] - start[0]);
        const incomingAngle = angle(incoming.start, incoming.end);
        const turn = (edge) => (angle(edge.start, edge.end) - incomingAngle + Math.PI * 2) % (Math.PI * 2);
        return candidates.reduce((best, edge) => turn(edge) < turn(best) ? edge : best);
      };
      while (unused.size) {
        const first = edges.get(unused.values().next().value);
        const startKey = pointKey(first.start);
        const ring = [first.start];
        let edge = first;
        let closed = false;
        let steps = 0;
        while (steps++ <= edges.size) {
          unused.delete(edge.key);
          ring.push(edge.end);
          const endKey = pointKey(edge.end);
          if (endKey === startKey) { closed = true; break; }
          const candidates = (outgoing.get(endKey) || []).filter((candidate) => unused.has(candidate.key));
          if (!candidates.length) break;
          edge = candidates.length === 1 ? candidates[0] : chooseNext(edge, candidates);
        }
        if (!closed) throw new Error('Ward boundaries could not be joined into a complete LGA outline.');
        rings.push(ring);
      }
      return rings;
    }

    _buildWardBackedMap(collection) {
      if (WARD_MAP_CACHE.has(collection)) return WARD_MAP_CACHE.get(collection);
      const allFeatures = collection.features || [];
      const bounds = { minLongitude:Infinity, maxLongitude:-Infinity, minLatitude:Infinity, maxLatitude:-Infinity };
      const collectCoordinates = (coordinates) => {
        if (!Array.isArray(coordinates)) return;
        if (typeof coordinates[0] === 'number') {
          bounds.minLongitude = Math.min(bounds.minLongitude, coordinates[0]);
          bounds.maxLongitude = Math.max(bounds.maxLongitude, coordinates[0]);
          bounds.minLatitude = Math.min(bounds.minLatitude, coordinates[1]);
          bounds.maxLatitude = Math.max(bounds.maxLatitude, coordinates[1]);
        } else coordinates.forEach(collectCoordinates);
      };
      allFeatures.forEach((feature) => feature.geometry && collectCoordinates(feature.geometry.coordinates));
      if (!Number.isFinite(bounds.minLongitude) || !allFeatures.length) throw new Error('Ward boundaries contain no valid geometry.');
      const centerLatitude = (bounds.minLatitude + bounds.maxLatitude) / 2 * Math.PI / 180;
      const cosine = Math.cos(centerLatitude);
      const projectedBounds = {
        left:bounds.minLongitude * cosine,
        right:bounds.maxLongitude * cosine,
        top:-bounds.maxLatitude,
        bottom:-bounds.minLatitude
      };
      const width = projectedBounds.right - projectedBounds.left;
      const height = projectedBounds.bottom - projectedBounds.top;
      const view = { x:0, y:0, width:632, height:516 };
      const scale = Math.min(view.width / width, view.height / height);
      const offsetX = view.x + (view.width - width * scale) / 2;
      const offsetY = view.y + (view.height - height * scale) / 2;
      const project = ([longitude, latitude]) => [
        offsetX + (longitude * cosine - projectedBounds.left) * scale,
        offsetY + (-latitude - projectedBounds.top) * scale
      ];
      const pathForRings = (rings) => rings.map((ring) => ring.map((point, index) => {
        const [x, y] = project(point);
        return (index ? 'L' : 'M') + x.toFixed(3) + ',' + y.toFixed(3);
      }).join(' ') + ' Z').join(' ');
      const ringsForFeature = (feature) => {
        const rings = [];
        const collect = (coordinates) => {
          if (!Array.isArray(coordinates)) return;
          if (Array.isArray(coordinates[0]) && typeof coordinates[0][0] === 'number') rings.push(coordinates);
          else coordinates.forEach(collect);
        };
        collect(feature.geometry?.coordinates);
        return rings;
      };
      const projectedArea = (ring) => {
        let area = 0;
        for (let index = 0; index < ring.length - 1; index++) {
          const [x1, y1] = project(ring[index]);
          const [x2, y2] = project(ring[index + 1]);
          area += x1 * y2 - x2 * y1;
        }
        return Math.abs(area / 2);
      };
      const canonicalLga = (name) => ({ agaie:'agai', munya:'muya' }[normalize(name)] || normalize(name));
      const groups = new Map();
      allFeatures.forEach((feature) => {
        const key = canonicalLga(feature.properties?.lga || '');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(feature);
      });
      const featureMap = {};
      const regions = Object.entries(FEATURES).map(([id, name]) => {
        const lgaFeatures = groups.get(canonicalLga(name)) || [];
        if (!lgaFeatures.length) throw new Error('Ward boundaries are missing ' + name + '.');
        const fill = pathForRings(lgaFeatures.flatMap(ringsForFeature));
        const outlineRings = this._wardBoundaryRings(lgaFeatures).filter((ring) => projectedArea(ring) >= .5);
        const outline = pathForRings(outlineRings);
        featureMap[id] = name;
        return '<g id="' + id + '" class="inistmap-lga-region"><path class="inistmap-lga-fill" d="' + fill + '" fill-rule="evenodd" stroke="none" pointer-events="all"/><path class="inistmap-lga-outline" d="' + outline + '" fill="none" stroke="inherit" stroke-width="1.2" stroke-linejoin="round" vector-effect="non-scaling-stroke" pointer-events="none"/></g>';
      }).join('');
      const attribution = 'Ward source: CIESIN, Columbia University and GRID3. 2026. GRID3 NGA Operational Wards v4.0. https://doi.org/10.7916/2pfj-hq78. CC BY-SA 4.0.';
      const markup = '<svg xmlns="' + SVG_NS + '" viewBox="0 0 632 516" preserveAspectRatio="xMidYMid meet" fill-rule="evenodd" aria-label="Niger State local government areas"><metadata>' + attribution + '</metadata><g class="inistmap-regions">' + regions + '</g></svg>';
      const result = { markup, featureMap, project };
      WARD_MAP_CACHE.set(collection, result);
      return result;
    }

    async _load() {
      try {
        let markup = BUILTIN_SVG;
        let featureMap = this.featureMap;
        if (this.options.mapUrl) {
          const response = await fetch(this.options.mapUrl, { signal: this.abortController.signal });
          if (!response.ok) throw new Error('Could not load map SVG (' + response.status + ').');
          markup = await response.text();
        } else if (this.options.wardDrilldown && !this.options.featureMap) {
          let wardCollection = this.options.wardGeoJSON || root.INISTMapWardData;
          if (!wardCollection && this.options.wardDataUrl) {
            this._wardDataPromise = fetch(this.options.wardDataUrl, { signal:this.abortController.signal }).then((response) => {
              if (!response.ok) throw new Error('Could not load ward boundaries (' + response.status + ').');
              return response.json();
            });
            try { wardCollection = await this._wardDataPromise; }
            catch (_) { this._wardDataPromise = null; }
          }
          if (wardCollection?.features?.length) {
            const generated = this._buildWardBackedMap(wardCollection);
            markup = generated.markup;
            featureMap = generated.featureMap;
            this._wardProjection = generated.project;
            this._wardGeoJSON = wardCollection;
            this._wardMapGenerated = true;
          }
        }
        this._createPopover();
        this._installMapMarkup(markup, featureMap, this.data);
        if (typeof ResizeObserver !== 'undefined') {
          this.resizeObserver = new ResizeObserver(() => this._positionPopover());
          this.resizeObserver.observe(this.stage);
        }
        (this.options.pins || []).forEach((pin) => this.addPin(pin));
        if (this._wardMapGenerated) this._showWardAttribution();
        this.container.setAttribute('aria-busy', 'false');
        this.status.textContent = this.features.length + ' map areas ready.';
        this._emit('inistmap:ready', { map: this, count: this.features.length });
        if (typeof this.options.onReady === 'function') this.options.onReady(this);
        return this;
      } catch (error) {
        if (error.name === 'AbortError') return this;
        this.container.setAttribute('aria-busy', 'false');
        this.status.textContent = error.message || 'The map could not be loaded.';
        this.status.classList.add('inistmap-error');
        this._emit('inistmap:error', { error });
        if (typeof this.options.onError === 'function') this.options.onError(error);
        return null;
      }
    }

    _installMapMarkup(markup, featureMap, data) {
        const parsed = new DOMParser().parseFromString(markup, 'image/svg+xml');
        const svg = parsed.documentElement;
        if (svg.localName !== 'svg' || parsed.querySelector('parsererror')) throw new Error('Map SVG is not valid XML.');
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('class', 'inistmap-svg');
        svg.setAttribute('role', 'group');
        svg.setAttribute('aria-label', this.options.title + (this._mapLevel === 'wards' ? ' wards' : ' local government areas'));
        svg.setAttribute('focusable', 'false');
        this.svg?.remove();
        const mapNode = document.importNode(svg, true);
        const reference = this.popover || (this.tools.parentElement === this.stage ? this.tools : null);
        this.stage.insertBefore(mapNode, reference);
        this.svg = mapNode;
        this.featureMap = featureMap;
        this.svg.querySelectorAll('text').forEach((label) => {
          if (this.options.showLabels && ['name', 'both'].includes(this.options.labelMode)) {
            label.remove();
          } else {
            label.style.pointerEvents = 'none';
          }
        });
        this.svg.querySelectorAll('image').forEach((label) => {
          label.style.pointerEvents = 'none';
        });
        if (!this.svg.viewBox.baseVal.width || !this.svg.viewBox.baseVal.height) throw new Error('Map SVG needs a non-empty viewBox.');
        this._bindNavigation();
        const nodes = new Map([...this.svg.querySelectorAll('[id]')].map((node) => [node.id, node]));
        this.features = Object.entries(this.featureMap)
          .filter(([id]) => nodes.has(id))
          .map(([id, name]) => ({ id, name, node: nodes.get(id) }));
        this._renderExtrusion();
        this.features.forEach((feature) => this._bindFeature(feature));
        this._renderSearchOptions();
        this.setData(data);
    }

    _bindFeature(feature) {
      const { node, id, name } = feature;
      node.classList.add('inistmap-feature');
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', name);
      node.setAttribute('aria-pressed', 'false');
      node.setAttribute('data-inistmap-id', id);
      node.addEventListener('pointerenter', () => this._hover(feature));
      node.addEventListener('pointerleave', () => this._hover(null));
      node.addEventListener('focus', () => this._hover(feature));
      node.addEventListener('blur', () => this._hover(null));
      node.addEventListener('click', (event) => {
        if (this._suppressNextClick && event.detail !== 0) {
          this._suppressNextClick = false;
          return;
        }
        this._activateFeature(feature, event);
      });
      node.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this._activateFeature(feature, event);
        }
      });
    }

    _lookup(key) {
      const wanted = normalize(key);
      const entry = Object.entries(this.data || {}).find(([candidate]) => normalize(candidate) === wanted);
      return entry ? entry[1] || {} : null;
    }

    _featureData(feature) {
      const item = this._lookup(feature.name) || this._lookup(feature.id);
      if (item) return item;
      return this._mapLevel === 'wards'
        ? { description:'Electoral ward in ' + this._currentLgaName + ' Local Government Area, Niger State.' }
        : {};
    }

    _palette() {
      const colors = Array.isArray(this.options.colors) && this.options.colors.length > 1 ? this.options.colors : DEFAULTS.colors;
      if (this.options.scaleType === 'linear' || colors.length > 2) return colors;
      const count = Math.max(2, Math.min(9, Number(this.options.classes) || 5));
      return Array.from({ length: count }, (_, index) => this._mixColors(colors, index / (count - 1)));
    }

    _mixColors(colors, ratio) {
      const parse = (hex) => hex.replace('#', '').match(/.{2}/g).map((part) => parseInt(part, 16));
      const position = ratio * (colors.length - 1);
      const index = Math.min(colors.length - 2, Math.floor(position));
      const fraction = position - index;
      const a = parse(colors[index]), b = parse(colors[index + 1]);
      return '#' + a.map((channel, channelIndex) => Math.round(channel + (b[channelIndex] - channel) * fraction).toString(16).padStart(2, '0')).join('');
    }

    _colorFor(value, min, max, breaks = []) {
      const colors = this._palette();
      if (!Number.isFinite(Number(value))) return '#f1f5f6';
      if (this.options.scaleType !== 'linear') {
        const index = breaks.filter((point) => Number(value) > point).length;
        return colors[Math.min(index, colors.length - 1)];
      }
      const ratio = max === min ? 0.5 : Math.max(0, Math.min(1, (Number(value) - min) / (max - min)));
      return this._mixColors(colors, ratio);
    }

    _classBreaks(values) {
      if (this.options.scaleType === 'linear' || values.length < 2) return [];
      const count = this._palette().length;
      const sorted = [...values].sort((a, b) => a - b);
      if (this.options.scaleType === 'equal') {
        const min = sorted[0], max = sorted[sorted.length - 1];
        return Array.from({ length: count - 1 }, (_, i) => min + (max - min) * (i + 1) / count);
      }
      if (this.options.scaleType !== 'quantile') return [];
      return Array.from({ length: count - 1 }, (_, i) => sorted[Math.min(sorted.length - 1, Math.ceil((i + 1) * sorted.length / count) - 1)]);
    }

    setData(data) {
      this.data = data || {};
      if (!this.svg) return this;
      const values = this.features.map((feature) => Number(this._featureData(feature).value)).filter(Number.isFinite);
      const min = values.length ? Math.min(...values) : 0;
      const max = values.length ? Math.max(...values) : 0;
      this.breaks = this._classBreaks(values);
      this.features.forEach((feature) => {
        const item = this._featureData(feature);
        feature.value = item.value ?? null;
        feature.label = item.label ?? (feature.value == null ? '' : String(feature.value));
        feature.description = item.description || '';
        feature.node.style.fill = item.color || this._colorFor(feature.value, min, max, this.breaks);
        feature.node.setAttribute('aria-label', [feature.name, feature.label, feature.description].filter(Boolean).join('. '));
      });
      this._styleSourceLabels();
      this._renderLegend(min, max, values.length, this.breaks);
      this._renderStats(values);
      this._renderLabels();
      if (this.selectedId) this._showDetail(this.features.find((item) => item.id === this.selectedId));
      return this;
    }

    _styleSourceLabels() {
      if (!this.svg) return;
      this.svg.querySelectorAll('.inistmap-source-label').forEach((label) => {
        const feature = this.features.find((item) => normalize(item.name) === normalize(label.textContent));
        if (!feature) return;
        const contrast = contrastingLabelColors(getComputedStyle(feature.node).fill);
        label.style.fill = contrast.fill;
        label.style.stroke = contrast.stroke;
        label.style.strokeWidth = '1.5px';
        label.style.strokeLinejoin = 'round';
        label.style.paintOrder = 'stroke';
      });
    }

    _renderLegend(min, max, count, breaks = []) {
      if (!this.options.showLegend || !count) { this.legend.replaceChildren(); return; }
      this.legend.replaceChildren();
      const heading = document.createElement('p');
      heading.className = 'inistmap-aside-title';
      heading.textContent = this.options.valueLabel;
      const scale = document.createElement('div');
      scale.className = 'inistmap-scale';
      const palette = this._palette();
      const swatchCount = this.options.scaleType === 'linear' ? 12 : palette.length;
      for (let index = 0; index < swatchCount; index++) {
        const swatch = document.createElement('span');
        const value = this.options.scaleType === 'linear'
          ? min + (max - min) * (index / Math.max(1, swatchCount - 1))
          : (index === 0 ? min : breaks[index - 1] ?? max) + ((breaks[index] ?? max) - (index === 0 ? min : breaks[index - 1] ?? max)) / 2;
        swatch.style.background = this._colorFor(value, min, max, breaks);
        if (this.options.scaleType !== 'linear') {
          const lower = index === 0 ? min : breaks[index - 1];
          const upper = breaks[index] ?? max;
          swatch.title = lower + ' – ' + upper;
          swatch.setAttribute('aria-label', lower + ' to ' + upper);
        }
        scale.append(swatch);
      }
      const labels = document.createElement('div');
      labels.className = 'inistmap-scale-labels';
      const low = document.createElement('span'), high = document.createElement('span');
      low.textContent = String(min);
      high.textContent = String(max);
      labels.append(low, high);
      this.legend.append(heading, scale, labels);
    }

    _renderStats(values) {
      if (!this.options.showStats) { this.stats.replaceChildren(); return; }
      const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
      const countLabel = this._mapLevel === 'wards' ? 'Wards in LGA' : 'LGAs on map';
      this.stats.innerHTML = '<div><strong class="inistmap-stat-count"></strong><span>' + countLabel + '</span></div><div><strong class="inistmap-stat-average"></strong><span>Average ' + this._escape(this.options.valueLabel.toLowerCase()) + '</span></div>';
      this.stats.querySelector('.inistmap-stat-count').textContent = String(new Set(this.features.map((feature) => feature.name)).size);
      this.stats.querySelector('.inistmap-stat-average').textContent = average == null ? '—' : Number.isInteger(average) ? String(average) : average.toFixed(1);
    }

    _renderSearchOptions() {
      const options = this.shell.querySelector('.inistmap-options');
      options.id = this.instanceId;
      options.replaceChildren();
      [...new Set(this.features.map((feature) => feature.name))].sort().forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        options.append(option);
      });
    }

    _renderExtrusion() {
      this.svg.querySelector('.inistmap-extrusion')?.remove();
      const depth = this._mapLevel === 'wards' ? 0 : Math.max(0, Math.min(36, Number(this.options.extrusionDepth) || 0));
      if (!depth || !this.features.length) return;
      const layer = document.createElementNS(SVG_NS, 'g');
      layer.setAttribute('class', 'inistmap-extrusion');
      layer.setAttribute('aria-hidden', 'true');
      layer.setAttribute('pointer-events', 'none');
      layer.setAttribute('transform', 'translate(' + (depth * .62) + ' ' + depth + ')');
      this.features.forEach((feature) => {
        const shape = feature.node.querySelector('.inistmap-lga-outline') || feature.node;
        const side = shape.cloneNode(false);
        side.removeAttribute('id');
        side.removeAttribute('class');
        side.removeAttribute('style');
        side.removeAttribute('tabindex');
        side.removeAttribute('role');
        side.removeAttribute('aria-label');
        side.removeAttribute('aria-pressed');
        side.setAttribute('fill', this.options.extrusionColor || '#25334a');
        side.setAttribute('stroke', this.options.extrusionColor || '#25334a');
        side.setAttribute('stroke-width', '0.8');
        side.setAttribute('stroke-linejoin', 'round');
        side.setAttribute('pointer-events', 'none');
        let renderedSide = side;
        for (let parent = shape.parentElement; parent && parent !== this.svg; parent = parent.parentElement) {
          const transform = parent.getAttribute('transform');
          if (!transform) continue;
          const wrapper = document.createElementNS(SVG_NS, 'g');
          wrapper.setAttribute('transform', transform);
          wrapper.append(renderedSide);
          renderedSide = wrapper;
        }
        layer.append(renderedSide);
      });
      const defs = [...this.svg.children].find((child) => child.localName === 'defs');
      this.svg.insertBefore(layer, defs ? defs.nextSibling : this.svg.firstChild);
      this.extrusionLayer = layer;
    }

    _renderLabels() {
      const old = this.svg.querySelector('.inistmap-data-labels');
      if (old) old.remove();
      if (!this.options.showLabels) return;
      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('class', 'inistmap-data-labels');
      const byName = new Map();
      this.features.forEach((feature) => {
        const current = byName.get(feature.name) || [];
        current.push(feature);
        byName.set(feature.name, current);
      });
      byName.forEach((features, name) => {
        const item = this._featureData(features[0]);
        const showName = this.options.labelMode === 'name' || this.options.labelMode === 'both';
        const showValue = this.options.labelMode === 'value' || this.options.labelMode === 'both';
        const labelValue = showValue ? (item.label || '') : '';
        if (!showName && !labelValue) return;
        try {
          const boxes = features.map((feature) => feature.node.getBBox());
          const left = Math.min(...boxes.map((box) => box.x));
          const top = Math.min(...boxes.map((box) => box.y));
          const right = Math.max(...boxes.map((box) => box.x + box.width));
          const bottom = Math.max(...boxes.map((box) => box.y + box.height));
          const box = { x:left, y:top, width:right-left, height:bottom-top };
          const wardLabel = this._mapLevel === 'wards' && showName;
          if (!wardLabel && (box.width < 26 || box.height < 18)) return;
          const text = document.createElementNS(SVG_NS, 'text');
          text.setAttribute('x', String(box.x + box.width / 2));
          text.setAttribute('y', String(box.y + box.height / 2 - (showName && labelValue ? 4 : 0)));
          text.setAttribute('class', 'inistmap-feature-label');
          text.setAttribute('data-feature-id', features[0].id);
          text.setAttribute('aria-hidden', 'true');
          text.style.pointerEvents = 'all';
          text.style.cursor = 'pointer';
          const contrast = contrastingLabelColors(getComputedStyle(features[0].node).fill);
          text.style.fill = contrast.fill;
          text.style.stroke = contrast.stroke;
          text.style.strokeWidth = '1.5px';
          text.style.strokeLinejoin = 'round';
          text.style.paintOrder = 'stroke';
          if (wardLabel) {
            const fittedFontSize = Math.max(5, Math.min(10, box.height * .32, box.width / Math.max(4, name.length * .58)));
            text.style.fontSize = fittedFontSize + 'px';
            text.style.strokeWidth = '1px';
          }
          text.addEventListener('click', (event) => {
            event.stopPropagation();
            if (this._suppressNextClick && event.detail !== 0) {
              this._suppressNextClick = false;
              return;
            }
            this._activateFeature(features[0], event);
          });
          text.addEventListener('pointerenter', () => this._hover(features[0]));
          text.addEventListener('pointerleave', () => this._hover(null));
          text.addEventListener('focus', () => this._hover(features[0]));
          text.addEventListener('blur', () => this._hover(null));
          if (showName) {
            const nameLine = document.createElementNS(SVG_NS, 'tspan');
            nameLine.setAttribute('x', String(box.x + box.width / 2));
            nameLine.setAttribute('class', 'inistmap-feature-label-name');
            nameLine.textContent = name;
            text.append(nameLine);
          }
          if (labelValue) {
            const valueLine = document.createElementNS(SVG_NS, 'tspan');
            valueLine.setAttribute('x', String(box.x + box.width / 2));
            valueLine.setAttribute('dy', showName ? '12' : '0');
            valueLine.setAttribute('class', 'inistmap-feature-label-value');
            valueLine.style.fill = contrast.fill;
            valueLine.textContent = labelValue;
            text.append(valueLine);
          } else text.textContent = labelValue;
          group.append(text);
        } catch (_) { /* Some SVG renderers do not implement getBBox. */ }
      });
      this.svg.append(group);
    }

    _createPopover() {
      if (!this.options.popover) return;
      const popover = document.createElement('aside');
      popover.className = 'inistmap-popover';
      popover.hidden = true;
      popover.setAttribute('role', 'dialog');
      popover.setAttribute('aria-modal', 'false');
      popover.setAttribute('aria-label', 'Area details');
      this.popover = popover;
      this.stage.append(popover);
      popover.addEventListener('pointerenter', () => this._clearPopoverHideTimer());
      popover.addEventListener('pointerleave', () => this._schedulePopoverHide());
      this._onPopoverOutsidePointerDown = (event) => {
        if (this.popover && !this.popover.hidden && !this.popover.contains(event.target)) this._hidePopover();
      };
      this.shell.addEventListener('pointerdown', this._onPopoverOutsidePointerDown);
      this._onPopoverKeydown = (event) => {
        if (event.key === 'Escape' && this.popover && !this.popover.hidden) this._hidePopover();
      };
      this.container.addEventListener('keydown', this._onPopoverKeydown);
    }

    _featureUrl(item) {
      const raw = typeof item.redirect === 'string' ? item.redirect : item.redirectTo || item.url || item.href;
      if (!raw) return null;
      try {
        const url = new URL(raw, document.baseURI);
        return ['http:', 'https:'].includes(url.protocol) ? url : null;
      } catch (_) { return null; }
    }

    _addFeatureLink(parent, item, label = 'View details') {
      const url = this._featureUrl(item);
      if (!url) return;
      const link = document.createElement('a');
      link.className = 'inistmap-detail-link';
      link.href = url.href;
      link.textContent = item.linkLabel || label;
      link.target = item.target === '_blank' || (!item.target && this.options.redirectTarget === '_blank') ? '_blank' : '_self';
      if (link.target === '_blank') link.rel = 'noopener noreferrer';
      parent.append(link);
    }

    _showPopover(feature) {
      if (!this.popover) return;
      this._clearPopoverHideTimer();
      this._popoverFeatureId = feature.id;
      const item = this._featureData(feature);
      const heading = document.createElement('div');
      heading.className = 'inistmap-popover-heading';
      const title = document.createElement('h3');
      title.className = 'inistmap-popover-title';
      title.textContent = feature.name;
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'inistmap-popover-close';
      close.setAttribute('aria-label', 'Close area details');
      close.textContent = '×';
      close.addEventListener('click', () => this._hidePopover());
      heading.append(title, close);
      const kicker = document.createElement('p');
      kicker.className = 'inistmap-popover-kicker';
      kicker.textContent = this.options.valueLabel;
      const value = document.createElement('p');
      value.className = 'inistmap-popover-value';
      value.textContent = item.label || (item.value == null ? 'No data available' : String(item.value));
      this.popover.replaceChildren(heading, kicker, value);
      if (item.description) {
        const description = document.createElement('p');
        description.className = 'inistmap-popover-description';
        description.textContent = item.description;
        this.popover.append(description);
      }
      this._addFeatureLink(this.popover, item, 'Open area');
      this.popover.dataset.featureId = feature.id;
      this.popover.hidden = false;
      this._positionPopover();
    }

    _positionPopover() {
      if (!this.popover || this.popover.hidden || !this.svg) return;
      const featureId = this._popoverFeatureId || this.selectedId;
      const feature = this.features.find((item) => item.id === featureId);
      if (!feature) return;
      const anchor = feature.node.getBoundingClientRect();
      const stage = this.stage.getBoundingClientRect();
      const popup = this.popover.getBoundingClientRect();
      const x = anchor.left + anchor.width / 2 - stage.left;
      const y = anchor.top + anchor.height / 2 - stage.top;
      const gap = 12;
      const left = Math.max(8, Math.min(stage.width - popup.width - 8, x - popup.width / 2));
      let top = y - popup.height - gap;
      if (top < 8) top = y + gap;
      top = Math.max(8, Math.min(stage.height - popup.height - 8, top));
      this.popover.style.left = left + 'px';
      this.popover.style.top = top + 'px';
    }

    _hidePopover() {
      this._clearPopoverHideTimer();
      this._popoverFeatureId = null;
      if (this.popover) this.popover.hidden = true;
    }

    _clearPopoverHideTimer() {
      if (this._popoverHideTimer) clearTimeout(this._popoverHideTimer);
      this._popoverHideTimer = null;
    }

    _schedulePopoverHide() {
      if (!this._usesPopoverTrigger('hover')) return;
      this._clearPopoverHideTimer();
      this._popoverHideTimer = setTimeout(() => {
        if (this.popover && !this.popover.matches(':hover')) this._hidePopover();
      }, 180);
    }

    _usesPopoverTrigger(trigger) {
      return this.options.popover && (this.options.popoverTrigger === trigger || this.options.popoverTrigger === 'both');
    }

    _activateFeature(feature) {
      this.select(feature.id);
      const item = this._featureData(feature);
      const url = this._featureUrl(item);
      const shouldRedirect = this.options.redirectOnFeatureClick || item.redirect === true || item.navigate === true || typeof item.redirect === 'string';
      if (url && shouldRedirect) {
        const target = item.target === '_blank' || (!item.target && this.options.redirectTarget === '_blank') ? '_blank' : '_self';
        if (target === '_blank') window.open(url.href, '_blank', 'noopener,noreferrer');
        else window.location.assign(url.href);
        return;
      }
      if (this._mapLevel === 'lgas' && this.options.wardDrilldown) this.openWardMap(feature.name);
    }

    _showDetail(feature) {
      if (!feature) return;
      const item = this._featureData(feature);
      this.detail.replaceChildren();
      const kicker = document.createElement('p');
      kicker.className = 'inistmap-detail-kicker';
      kicker.textContent = this.options.valueLabel.toUpperCase();
      const heading = document.createElement('h3');
      heading.className = 'inistmap-detail-name';
      heading.textContent = feature.name;
      const value = document.createElement('p');
      value.className = 'inistmap-detail-value';
      value.textContent = item.label || (item.value == null ? 'No data available' : String(item.value));
      this.detail.append(kicker, heading, value);
      if (item.description) {
        const description = document.createElement('p');
        description.className = 'inistmap-detail-copy';
        description.textContent = item.description;
        this.detail.append(description);
      }
      this._addFeatureLink(this.detail, item);
      this.search.value = feature.name;
    }

    _hover(feature) {
      if (feature) {
        this._clearPopoverHideTimer();
        if (this._usesPopoverTrigger('hover')) this._showPopover(feature);
      } else this._schedulePopoverHide();
      if (typeof this.options.onFeatureHover === 'function') this.options.onFeatureHover(feature ? this._publicFeature(feature) : null);
      this._emit('inistmap:hover', feature ? this._publicFeature(feature) : null);
    }

    select(nameOrId) {
      const query = normalize(nameOrId);
      const feature = this.features.find((item) => normalize(item.id) === query || normalize(item.name) === query);
      if (!feature) return this;
      this.selectedId = feature.id;
      this.features.forEach((item) => {
        const selected = item.name === feature.name;
        item.node.classList.toggle('inistmap-selected', selected);
        item.node.setAttribute('aria-pressed', String(selected));
      });
      this._showDetail(feature);
      this.tools.querySelector('[data-action="fit-selection"]').disabled = false;
      if (this.options.zoomOnSelect) this.zoomTo(feature.name);
      if (this._usesPopoverTrigger('click')) this._showPopover(feature);
      const detail = this._publicFeature(feature);
      this.status.textContent = feature.name + ' selected.';
      if (typeof this.options.onFeatureClick === 'function') this.options.onFeatureClick(detail);
      this._emit('inistmap:select', detail);
      return this;
    }

    clearSelection() {
      this.selectedId = null;
      this.tools.querySelector('[data-action="fit-selection"]').disabled = true;
      this.features.forEach((item) => {
        item.node.classList.remove('inistmap-selected');
        item.node.setAttribute('aria-pressed', 'false');
      });
      this.search.value = '';
      this._hidePopover();
      this.detail.innerHTML = '<p class="inistmap-detail-kicker">SELECT AN AREA</p><h3 class="inistmap-detail-name"></h3><p class="inistmap-detail-copy">Choose an LGA on the map or use the search box to see its details.</p>';
      this.detail.querySelector('h3').textContent = this.options.title;
      return this;
    }

    addPin(pin) {
      if (!this.svg || !pin || !Number.isFinite(Number(pin.x)) || !Number.isFinite(Number(pin.y))) return null;
      const group = document.createElementNS(SVG_NS, 'g');
      const id = String(pin.id || 'pin-' + (this.pinNodes.size + 1));
      this.removePin(id);
      group.setAttribute('data-pin-id', id);
      group.setAttribute('class', 'inistmap-pin');
      group.setAttribute('transform', 'translate(' + Number(pin.x) + ' ' + Number(pin.y) + ')');
      group.setAttribute('tabindex', '0');
      group.setAttribute('role', 'button');
      group.setAttribute('aria-label', pin.label || 'Map location');
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', pin.color || '#ef6c45');
      const title = document.createElementNS(SVG_NS, 'title');
      title.textContent = [pin.label, pin.description].filter(Boolean).join(' — ');
      group.append(circle, title);
      const activate = () => { if (typeof pin.onClick === 'function') pin.onClick(pin); };
      group.addEventListener('click', activate);
      group.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); } });
      (this.svg.querySelector('#ngjspins') || this.svg).append(group);
      this.pinNodes.set(id, group);
      return group;
    }

    removePin(id) {
      const node = this.pinNodes.get(String(id));
      if (node) node.remove();
      this.pinNodes.delete(String(id));
      return this;
    }

    clearPins() {
      this.pinNodes.forEach((node) => node.remove());
      this.pinNodes.clear();
      return this;
    }

    _publicFeature(feature) {
      const item = this._featureData(feature);
      return { id: feature.id, name: feature.name, level:this._mapLevel, lga:this._mapLevel === 'wards' ? this._currentLgaName : null, value: item.value ?? null, label: item.label ?? '', description: item.description || '', data: item };
    }

    _emit(name, detail) {
      this.container.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
    }

    async openWardMap(lgaName) {
      const bundledWardData = this.options.wardGeoJSON || this._wardGeoJSON || root.INISTMapWardData;
      if (!this.options.wardDrilldown || (!bundledWardData && !this.options.wardDataUrl) || this._mapLevel !== 'lgas' || this._wardTransitionPending) return this;
      this._wardTransitionPending = true;
      const lga = String(lgaName || '');
      this.status.textContent = 'Loading wards for ' + lga + '…';
      try {
        if (!this._wardDataPromise) {
          this._wardDataPromise = bundledWardData
            ? Promise.resolve(bundledWardData)
            : fetch(this.options.wardDataUrl, { signal: this.abortController.signal })
              .then((response) => {
                if (!response.ok) throw new Error('Could not load ward boundaries (' + response.status + ').');
                return response.json();
              })
              .catch((error) => { this._wardDataPromise = null; throw error; });
        }
        const collection = await this._wardDataPromise;
        if (this._mapLevel !== 'lgas') return this;
        const aliases = { munya:'muya', agaie:'agai' };
        const wanted = aliases[normalize(lga)] || normalize(lga);
        const wards = (collection.features || []).filter((feature) => {
          const name = normalize(feature.properties?.lga);
          return (aliases[name] || name) === wanted;
        });
        if (!wards.length) throw new Error('No ward boundaries were found for ' + lga + '.');
        const lgaFeature = this.features.find((feature) => normalize(feature.name) === normalize(lga));
        if (lgaFeature) {
          this.status.textContent = 'Zooming into ' + lga + '…';
          this.zoomTo(lgaFeature.id, 1.08, true);
          if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        }
        if (this.destroyed || this._mapLevel !== 'lgas') return this;
        const mainMapMarkup = this.svg.cloneNode(true);
        mainMapMarkup.setAttribute('viewBox', [this.baseViewBox.x, this.baseViewBox.y, this.baseViewBox.width, this.baseViewBox.height].join(' '));
        this._mainViewSnapshot = {
          markup:mainMapMarkup.outerHTML,
          featureMap:this.featureMap,
          data:this.data,
          valueLabel:this.options.valueLabel,
          selectedId:this.selectedId,
          lgaFeatures:this.features,
          baseViewBox:{ ...this.baseViewBox },
          showLabels:this.options.showLabels,
          labelMode:this.options.labelMode,
          selectedName:this.features.find((feature) => feature.id === this.selectedId)?.name || lga
        };
        this._cancelViewAnimation();
        this._cancelWheelZoom();
        this._hidePopover();
        this._mapLevel = 'wards';
        this._currentLgaName = lga;
        this.options.title = lga;
        this.options.showLabels = true;
        this.options.labelMode = 'name';
        const suppliedWardData = this._wardDataFor(lga);
        const wardData = Object.fromEntries(wards.map((feature) => [feature.properties.ward, {
          color:'rgba(255,255,255,.035)',
          description:'Electoral ward in ' + lga + ' Local Government Area, Niger State.'
        }]));
        Object.entries(suppliedWardData).forEach(([name, item]) => { wardData[name] = item; });
        const hasWardMetrics = Object.values(wardData).some((item) => item && (item.value != null || item.label));
        if (!hasWardMetrics) this.options.valueLabel = 'Ward information';
        this.selectedId = null;
        this.search.closest('.inistmap-search-wrap').hidden = !this.options.showSearch;
        this.search.closest('.inistmap-search-wrap').querySelector('span').textContent = 'Find a ward';
        this.search.placeholder = 'Search wards';
        this.search.value = '';
        this.tools.querySelector('[data-action="back-to-lgas"]').hidden = false;
        this.tools.querySelector('[data-action="fit-selection"]').disabled = true;
        this.shell.querySelector('.inistmap-title').textContent = lga + ' wards';
        this.shell.querySelector('.inistmap-subtitle').textContent = 'Explore wards within ' + lga + ' LGA.';
        this.stage.setAttribute('aria-label', lga + ' wards map. Use plus and minus to zoom, drag to pan, and select a ward for details.');
        this.detail.replaceChildren();
        const kicker = document.createElement('p');
        kicker.className = 'inistmap-detail-kicker';
        kicker.textContent = 'WARD BOUNDARIES';
        const heading = document.createElement('h3');
        heading.className = 'inistmap-detail-name';
        heading.textContent = lga;
        const description = document.createElement('p');
        description.className = 'inistmap-detail-copy';
        description.textContent = 'Select a ward to inspect it. Drag to pan, scroll or pinch to zoom.';
        this.detail.append(kicker, heading, description);
        const wardLayer = this._createWardOverlay(wards, lgaFeature);
        const wardNodes = new Map([...wardLayer.querySelectorAll('[id]')].map((node) => [node.id, node]));
        this.featureMap = wardLayer.featureMap;
        this.features = Object.entries(this.featureMap).map(([id, name]) => ({ id, name, node:wardNodes.get(id) }));
        this._mainViewSnapshot.lgaFeatures.forEach((feature) => {
          feature.node.style.pointerEvents = 'none';
          feature.node.setAttribute('tabindex', '-1');
          feature.node.setAttribute('aria-hidden', 'true');
          if (normalize(feature.name) !== normalize(lga)) feature.node.style.display = 'none';
        });
        this.features.forEach((feature) => this._bindFeature(feature));
        this._renderExtrusion();
        this._renderSearchOptions();
        this.setData(wardData);
        if (lgaFeature) {
          this.baseViewBox = { ...this.viewBox };
          this.viewBox = { ...this.baseViewBox };
          this._updateZoomLabel();
        }
        this.stage.classList.add('inistmap-ward-transitioning');
        requestAnimationFrame(() => this.stage.classList.remove('inistmap-ward-transitioning'));
        this._showWardAttribution();
        this.status.textContent = lga + ': ' + wards.length + ' wards. Select a ward to inspect it.';
        this._emit('inistmap:level-change', { level:'wards', lga, count:wards.length });
      } catch (error) {
        if (error.name === 'AbortError') return this;
        this.status.textContent = error.message || 'Could not load ward boundaries.';
        this._emit('inistmap:error', { error });
      } finally {
        this._wardTransitionPending = false;
      }
      return this;
    }

    _wardDataFor(lga) {
      const entry = Object.entries(this.options.wardData || {}).find(([name]) => normalize(name) === normalize(lga));
      return entry ? entry[1] || {} : {};
    }

    _createWardOverlay(features, lgaFeature) {
      let project = this._wardProjection;
      if (!project) {
        const bounds = { minLongitude:Infinity, maxLongitude:-Infinity, minLatitude:Infinity, maxLatitude:-Infinity };
        const visit = (coordinates) => {
          if (!Array.isArray(coordinates)) return;
          if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
            bounds.minLongitude = Math.min(bounds.minLongitude, coordinates[0]);
            bounds.maxLongitude = Math.max(bounds.maxLongitude, coordinates[0]);
            bounds.minLatitude = Math.min(bounds.minLatitude, coordinates[1]);
            bounds.maxLatitude = Math.max(bounds.maxLatitude, coordinates[1]);
          } else coordinates.forEach(visit);
        };
        features.forEach((feature) => feature.geometry && visit(feature.geometry.coordinates));
        if (!Number.isFinite(bounds.minLongitude) || !Number.isFinite(bounds.minLatitude) || !lgaFeature) {
          throw new Error('Ward boundary data does not contain valid coordinates.');
        }
        const target = lgaFeature.node.getBBox();
        const longitudeSpan = Math.max(.000001, bounds.maxLongitude - bounds.minLongitude);
        const latitudeSpan = Math.max(.000001, bounds.maxLatitude - bounds.minLatitude);
        project = ([longitude, latitude]) => [
          target.x + (longitude - bounds.minLongitude) / longitudeSpan * target.width,
          target.y + (bounds.maxLatitude - latitude) / latitudeSpan * target.height
        ];
      }
      const pathForRings = (rings) => rings.map((ring) => ring.map((point, index) => {
        const [x, y] = project(point);
        return (index ? 'L' : 'M') + x.toFixed(3) + ',' + y.toFixed(3);
      }).join(' ') + ' Z').join(' ');
      const featureMap = {};
      const layer = document.createElementNS(SVG_NS, 'g');
      layer.setAttribute('class', 'inistmap-ward-layer');
      layer.setAttribute('fill-rule', 'evenodd');
      if (!this._wardProjection) {
        const clipPathId = this.instanceId + '-ward-clip';
        const defs = this.svg.querySelector('defs') || document.createElementNS(SVG_NS, 'defs');
        if (!defs.parentNode) this.svg.insertBefore(defs, this.svg.firstChild);
        const clip = document.createElementNS(SVG_NS, 'clipPath');
        clip.id = clipPathId;
        clip.setAttribute('clipPathUnits', 'userSpaceOnUse');
        let clippedFeature = lgaFeature.node.cloneNode(false);
        ['id', 'class', 'style', 'tabindex', 'role', 'aria-label', 'aria-pressed', 'data-inistmap-id'].forEach((name) => clippedFeature.removeAttribute(name));
        for (let parent = lgaFeature.node.parentElement; parent && parent !== this.svg; parent = parent.parentElement) {
          const transform = parent.getAttribute('transform');
          if (!transform) continue;
          const wrapper = document.createElementNS(SVG_NS, 'g');
          wrapper.setAttribute('transform', transform);
          wrapper.append(clippedFeature);
          clippedFeature = wrapper;
        }
        clip.append(clippedFeature);
        defs.append(clip);
        layer.setAttribute('clip-path', 'url(#' + clipPathId + ')');
      }
      features.forEach((feature, index) => {
        const id = 'ward-' + String(index + 1).padStart(3, '0');
        const polygonList = feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates];
        const d = polygonList.map(pathForRings).join(' ');
        featureMap[id] = feature.properties.ward;
        const path = document.createElementNS(SVG_NS, 'path');
        path.id = id;
        path.setAttribute('d', d);
        path.setAttribute('class', 'inistmap-ward-shape');
        path.setAttribute('fill-rule', 'evenodd');
        layer.append(path);
      });
      const metadata = document.createElementNS(SVG_NS, 'metadata');
      metadata.textContent = 'Ward source: CIESIN, Columbia University and GRID3. 2026. GRID3 NGA Operational Wards v4.0. https://doi.org/10.7916/2pfj-hq78. CC BY-SA 4.0.';
      this.svg.append(metadata, layer);
      return Object.assign(layer, { featureMap });
    }

    backToLGAs() {
      if (this._mapLevel !== 'wards' || !this._mainViewSnapshot) return this;
      const snapshot = this._mainViewSnapshot;
      this._cancelViewAnimation();
      this._cancelWheelZoom();
      this._hidePopover();
      this._mapLevel = 'lgas';
      this.baseViewBox = { ...snapshot.baseViewBox };
      this.viewBox = { ...snapshot.baseViewBox };
      this.options.title = this._mainMapTitle;
      this.options.valueLabel = snapshot.valueLabel;
      this.options.showLabels = snapshot.showLabels;
      this.options.labelMode = snapshot.labelMode;
      this.selectedId = null;
      this.search.closest('.inistmap-search-wrap').hidden = !this.options.showSearch;
      this.search.closest('.inistmap-search-wrap').querySelector('span').textContent = 'Find an LGA';
      this.search.placeholder = 'Search LGAs';
      this.search.value = snapshot.selectedName || '';
      this.tools.querySelector('[data-action="back-to-lgas"]').hidden = true;
      this.tools.querySelector('[data-action="fit-selection"]').disabled = !snapshot.selectedId;
      this.shell.querySelector('.inistmap-title').textContent = this._mainMapTitle;
      this.shell.querySelector('.inistmap-subtitle').textContent = 'Explore local data by local government area.';
      this.stage.setAttribute('aria-label', 'Map. Use plus and minus to zoom, drag to pan, and select an area for details.');
      this.stage.classList.add('inistmap-ward-transitioning');
      this._installMapMarkup(snapshot.markup, snapshot.featureMap, snapshot.data);
      this._updateZoomLabel();
      requestAnimationFrame(() => this.stage.classList.remove('inistmap-ward-transitioning'));
      this.stage.querySelector('.inistmap-ward-attribution')?.remove();
      this.selectedId = snapshot.selectedId;
      const selected = this.features.find((feature) => feature.id === snapshot.selectedId);
      if (selected) {
        this.features.forEach((feature) => {
          const active = feature.name === selected.name;
          feature.node.classList.toggle('inistmap-selected', active);
          feature.node.setAttribute('aria-pressed', String(active));
        });
        this._showDetail(selected);
      }
      this.status.textContent = 'Back to Niger State LGAs.';
      this._mainViewSnapshot = null;
      this._emit('inistmap:level-change', { level:'lgas' });
      return this;
    }

    _showWardAttribution() {
      this.stage.querySelector('.inistmap-ward-attribution')?.remove();
      const attribution = document.createElement('a');
      attribution.className = 'inistmap-ward-attribution';
      attribution.href = 'https://doi.org/10.7916/2pfj-hq78';
      attribution.target = '_blank';
      attribution.rel = 'noopener noreferrer';
      attribution.textContent = 'Ward boundaries: GRID3 / CIESIN · operational data';
      attribution.title = 'GRID3 NGA Operational Wards v4.0, CC BY-SA 4.0';
      this.stage.append(attribution);
    }

    _escape(value) {
      const node = document.createElement('span');
      node.textContent = String(value);
      return node.innerHTML;
    }

    destroy() {
      this.destroyed = true;
      this._clearPopoverHideTimer();
      this.abortController.abort();
      this._navigationController?.abort();
      this._cancelWheelZoom();
      this._cancelViewAnimation();
      this.clearPins();
      this.svg?.removeEventListener('pointerdown', this._onPointerDown);
      document.removeEventListener('pointermove', this._onPointerMove);
      document.removeEventListener('pointerup', this._onPointerUp);
      document.removeEventListener('pointercancel', this._onPointerUp);
      this.container.removeEventListener('fullscreenchange', this._onFullscreenChange);
      if (this._onPopoverOutsidePointerDown) this.shell.removeEventListener('pointerdown', this._onPopoverOutsidePointerDown);
      if (this._onPopoverKeydown) this.container.removeEventListener('keydown', this._onPopoverKeydown);
      this.resizeObserver?.disconnect();
      this.container.replaceChildren();
      this.container.removeAttribute('aria-busy');
      this.container.classList.remove('inistmap');
      this.features = [];
    }
  }

  INISTMap.features = Object.freeze(Object.assign({}, FEATURES));
  INISTMap._nextId = 1;
  root.INISTMap = INISTMap;
  if (typeof module !== 'undefined' && module.exports) module.exports = INISTMap;
})(typeof window !== 'undefined' ? window : globalThis);
