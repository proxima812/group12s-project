import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const menuItems = [
	{
		id: 1,
		label: "Все группы",
		href: "/",
		class: "bg-green-200 rounded-lg px-4 py-2  text-green-700",
	},
	{
		id: 2,
		label: "О проекте",
		target: "_blank",
		class: "bg-blue-200 rounded-lg px-4 py-2  text-blue-700",
		href: "https://t.me/all_groups12",
	},
	{
		id: 3,
		label: "Обратная связь",
		target: "_blank",
		class: "bg-blue-200 rounded-lg px-4 py-2  text-blue-700",
		href: "https://t.me/all_groups12/3",
	},
	{
		id: 4,
		label: "Посты",
		href: "/posts",
		class: "bg-amber-200 rounded-lg px-4 py-2  text-amber-700",
	},
	{
		id: 5,
		label: "Добавили вашу группу без вашего ведома?",
    href: "https://t.me/all_groups12/5",
    class: 'underline',
    target: '_blank',
		// class: "bg-red-200 rounded-lg px-4 py-2  text-red-700",
	},
]

function SideMenu() {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")
		} else {
			document.body.classList.remove("overflow-hidden")
		}

		// Очистка эффекта
		return () => {
			document.body.classList.remove("overflow-hidden")
		}
	}, [isOpen])

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="md:hidden z-50 relative">
			{/* Кнопка для открытия меню */}
			<button
				onClick={toggleMenu}
				className="text-purple-700 bg-purple-100 ring-1 ring-purple-400 font-medium rounded-lg text-sm px-3.5 py-1.5 md:px-5 md:py-2.5"
			>
				Меню
			</button>

			{/* Меню */}
			<motion.div
				className={`fixed p-5 top-0 left-0 w-full h-full bg-gray-950/70 backdrop-blur-xl bg-opacity-80 flex flex-col items-center justify-center`}
				initial={{ y: "-100%", opacity: 0 }}
				animate={
					isOpen
						? {
								y: 0,
								opacity: 1,
								scale: [1.1, 1],
								transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
							}
						: { y: "-100%", opacity: 0, scale: 1 }
				}
				transition={{ duration: 0.1 }}
				style={{ display: isOpen ? "flex" : "none" }} // Скрываем меню, когда оно закрыто
			>
				{/* Кнопка закрытия меню */}
				<button
					onClick={toggleMenu}
					className="absolute top-10 right-10 text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5"
				>
					Закрыть
				</button>

				{/* Список элементов меню с анимацией */}
				<motion.ul
					className="text-white text-2xl flex flex-col gap-8 text-center"
					initial={{ opacity: 0 }} // Начальное состояние
					animate={isOpen ? { opacity: 1 } : { opacity: 0 }} // Конечное состояние
					transition={{ duration: 0.3 }}
				>
					{menuItems.map((item, index) => (
						<motion.li
							key={item.id}
							initial={{ opacity: 0, y: 40 }} // Начальное состояние для каждого элемента
							animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Конечное состояние
							transition={{
								duration: 0.6,
								delay: index * 0.2, // Сдвиг анимации на основе индекса
							}}
						>
							<a href={item.href} className={item.class} target={item.target}>
								{item.label}
							</a>
						</motion.li>
					))}
				</motion.ul>
			</motion.div>
		</div>
	)
}

export default SideMenu
