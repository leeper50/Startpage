#SingleInstance Force
#MaxThreadsPerHotkey 4

; Key rebinds
; Send pausebreak as windows+shift+A
#InputLevel, 0
Pause::#+A

; Control + F9
; Open image in new tab + Go to next tab
*^F9::
MouseClick, right, 400, 450
Send, i
Send, {CTRL down}
Send, w
Sleep 5
Send, {TAB}
Sleep 5
Send, {CTRL up}
return

; Control + F13
; Control + Mouse5
; Auto Miner
*^F13::
*^XButton2::
T1 := !T1
If T1 {
	SendInput, {SHIFT down}
	SendInput, {w down}
	MouseClick left,,,,,D
}
Else {
	SendInput, {SHIFT up}
	SendInput, {w up}
	MouseClick left,,,,,U
}
return

; Alt + F13
; Auto clicker (Left)
*!F13::
T2 := !T2
Loop {
	If Not T2
		Break
	Click
	Sleep 5
}
return

; Win + F13
; Auto clicker (Right)
*#F13::
T3 := !T3
Loop {
	If Not T3
		Break
	Click, Right
	Sleep 5
}
return

; Shift + F13
; Hold click (Left)
*+F13::
T4 := !T4
If T4 {
	Click, Down
}
Else {
	Click, Up
}
return
