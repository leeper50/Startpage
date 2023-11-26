#SingleInstance force
#MaxThreadsPerHotkey 4

; Globals
Toggle := False

; Control + F9
; Open image in new tab + Go to next tab
*^F9::
  {
    ; MouseClick, "right", 400, 450
    Click 400, 650, "Right"
    Sleep 25
    Send "i"
    Sleep 25
    Send "{Control down}"
    Send "w"
    Sleep 25
    Send "{Tab}"
    Sleep 25
    Send "{Control up}"
  }

; Control + F10
; Open image in new tab + Go to next tab
*^F10::
  {
    WinGetPos &X, &Y, &W, &H, "A"
    X := W * 0.45
    Y := H * 0.5
    Click X, Y, "Right"
    Sleep 25
    Send "i"
    Sleep 25
    Send "{Control down}"
    Send "w"
    Sleep 25
    Send "{Tab}"
    Sleep 25
    Send "{Control up}"
  }

; Control + F13
; Control + Mouse5
; Auto Miner
*^F13::
  {
    global Toggle := !Toggle
    if (Toggle) {
      SendInput "{SHIFT down}"
      SendInput "{w down}"
      Click "Down Left"
    }
    else {
      SendInput "{SHIFT up}"
      SendInput "{w up}"
      Click "Up Left"
    }
  }

; Alt + F13
; Auto clicker (Left)
*!F13::
  {
    global Toggle := !Toggle
    Loop {
      if (not Toggle)
        Break
      Click "Left"
      Sleep 5
    }
  }

; Win + F13
; Auto clicker (Right)
*#F13::
  {
    global Toggle := !Toggle
    Loop {
      if (not Toggle)
        Break
      Click "Right"
      Sleep 5
    }
  }

; Shift + F13
; Hold click (Left)
*+F13::
  {
    global Toggle := !Toggle
    if (Toggle) {
      Click "Down Left"
    }
    else {
      Click "Up Left"
    }
  }

