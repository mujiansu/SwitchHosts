
set source=%cd%\app-ui\styles\iconfont
set target=%cd%\node_modules\antd\lib\style\core\iconfont

if exist %target% rmdir /s/q  %target%

mklink /d "%target%" "%source%"