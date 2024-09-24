import React from "react"

function PreloaderCard() {
	return (
		<div className="w-full rounded-lg border shadow-md flex flex-col p-5 bg-white animate-pulse transition-transform transform hover:scale-105 h-[210px]">
			{/* Заголовок загрузки */}
			<div className="h-[30px] bg-zinc-100 rounded-md mb-3 w-3/4"></div>
			{/* Подзаголовок загрузки */}
			<div className="h-[20px] bg-zinc-100 rounded-md mb-2 w-1/2"></div>
			{/* Основное содержимое загрузки */}
			<div className="flex-1">
				<div className="h-[15px] bg-zinc-100 rounded-md mb-1"></div>
				<div className="h-[15px] bg-zinc-100 rounded-md mb-1"></div>
				<div className="h-[15px] bg-zinc-100 rounded-md mb-1 w-5/6"></div>
			</div>
			{/* Кнопка загрузки */}
			<div className="h-[35px] bg-zinc-200 rounded-md mt-3"></div>
		</div>
	)
}

export default PreloaderCard
