// Памятка:
// 1. import {
// handleInputCount, handleFocusCount, handleBlurCount
// } from '../../../common/inputCount/inputCount';
// 2. Передать в input:
// name='...'
// onInput={handleInputCount.bind(null, num100)}
// onFocus={handleFocusCount}
// onBlur={handleBlurCount}
// 3. Добавить в компоненту:
// const num100 = 100;
// 4. Добавить в компоненту:
// <span id='statusWrapCount' className={s.countStyle}>
// <span id='statusCount'></span> of 100
// </span>
// 5. Задать родителю span-a:
// position: relative;
// 6. Если нужно, чтобы не был виден счётчик при первом отображении input, применить:
// .countStyle {display: none;}

export const handleFocusCount = (e) => {
  e.target.select()

  document.getElementById(`${e.target.name}Count`).textContent =
    e.target.value.length

  const elem = document.getElementById(`${e.target.name}WrapCount`)
  elem.style.display = 'inline-block'
  elem.style.fontSize = '10px'
  elem.style.position = 'absolute'
  elem.style.right = '10px'
  elem.style.top = 0
}

export const handleBlurCount = (e) => {
  document.getElementById(`${e.target.name}WrapCount`).style.display = 'none'
}

export const handleInputCount = (num, e) => {
  const wrap = `${e.target.name}WrapCount`
  const count = `${e.target.name}Count`
  const { length } = e.target.value

  if (length < num - 10) document.getElementById(wrap).style.color = 'white'
  if (length >= num - 10) document.getElementById(wrap).style.color = 'yellow'
  if (length === num) document.getElementById(wrap).style.color = 'red'

  document.getElementById(count).textContent = e.target.value.length
}
