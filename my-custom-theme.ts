
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #268bd2 
		"--color-primary-50": "222 238 248", // #deeef8
		"--color-primary-100": "212 232 246", // #d4e8f6
		"--color-primary-200": "201 226 244", // #c9e2f4
		"--color-primary-300": "168 209 237", // #a8d1ed
		"--color-primary-400": "103 174 224", // #67aee0
		"--color-primary-500": "38 139 210", // #268bd2
		"--color-primary-600": "34 125 189", // #227dbd
		"--color-primary-700": "29 104 158", // #1d689e
		"--color-primary-800": "23 83 126", // #17537e
		"--color-primary-900": "19 68 103", // #134467
		// secondary | #cb4b16 
		"--color-secondary-50": "247 228 220", // #f7e4dc
		"--color-secondary-100": "245 219 208", // #f5dbd0
		"--color-secondary-200": "242 210 197", // #f2d2c5
		"--color-secondary-300": "234 183 162", // #eab7a2
		"--color-secondary-400": "219 129 92", // #db815c
		"--color-secondary-500": "203 75 22", // #cb4b16
		"--color-secondary-600": "183 68 20", // #b74414
		"--color-secondary-700": "152 56 17", // #983811
		"--color-secondary-800": "122 45 13", // #7a2d0d
		"--color-secondary-900": "99 37 11", // #63250b
		// tertiary | #859900 
		"--color-tertiary-50": "237 240 217", // #edf0d9
		"--color-tertiary-100": "231 235 204", // #e7ebcc
		"--color-tertiary-200": "225 230 191", // #e1e6bf
		"--color-tertiary-300": "206 214 153", // #ced699
		"--color-tertiary-400": "170 184 77", // #aab84d
		"--color-tertiary-500": "133 153 0", // #859900
		"--color-tertiary-600": "120 138 0", // #788a00
		"--color-tertiary-700": "100 115 0", // #647300
		"--color-tertiary-800": "80 92 0", // #505c00
		"--color-tertiary-900": "65 75 0", // #414b00
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #d33682 
		"--color-error-50": "248 225 236", // #f8e1ec
		"--color-error-100": "246 215 230", // #f6d7e6
		"--color-error-200": "244 205 224", // #f4cde0
		"--color-error-300": "237 175 205", // #edafcd
		"--color-error-400": "224 114 168", // #e072a8
		"--color-error-500": "211 54 130", // #d33682
		"--color-error-600": "190 49 117", // #be3175
		"--color-error-700": "158 41 98", // #9e2962
		"--color-error-800": "127 32 78", // #7f204e
		"--color-error-900": "103 26 64", // #671a40
		// surface | #222222 
		"--color-surface-50": "222 222 222", // #dedede
		"--color-surface-100": "211 211 211", // #d3d3d3
		"--color-surface-200": "200 200 200", // #c8c8c8
		"--color-surface-300": "167 167 167", // #a7a7a7
		"--color-surface-400": "100 100 100", // #646464
		"--color-surface-500": "34 34 34", // #222222
		"--color-surface-600": "31 31 31", // #1f1f1f
		"--color-surface-700": "26 26 26", // #1a1a1a
		"--color-surface-800": "20 20 20", // #141414
		"--color-surface-900": "17 17 17", // #111111
		
	}
}