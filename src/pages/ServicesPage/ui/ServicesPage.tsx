import Bugsnag from '@bugsnag/js'
import '../../temp/styles.css'

export const ServicesPage = () => {
  Bugsnag.notify(new Error('Test error for Bugsnag')) // Вызовем ошибку при рендере компонента

  return (
    <div className='outerContainer'>
      <div className='innerContainer'>Страница в разработке . . .</div>
    </div>
  )
}
