'use client'
import React from 'react'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { useLang } from '@/src/shared/hooks/useLang'
import styles from './PrivacyPolicy.module.scss'

export const PrivacyPolicyPage: React.FC = () => {
  const { lang, translations } = useLang()

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>{translations[lang].page_titles.privacy}</Htag>
        </div>
        <div className={styles.text_container}>
          <p className={styles.privacy_intro}>
            Настоящая «Политика обработки персональных данных» (далее по тексту
            – «Политика») определяет основные принципы, цели, условия и способы
            обработки ИП Кабанченко Светлана Геннадьевна (ОГРНИП
            321784700103601) (далее – «Оператор») персональных данных
            Пользователей сайта http://newartspace.ru/ (как определено в разделе
            1 ниже), а также всех иных физических лиц, предоставляющих Оператору
            свои персональные данные.
          </p>

          <h2 className={styles.privacy_subtitle}>1. Общие положения</h2>
          <p className={styles.privacy_text}>
            1.1. Настоящая Политика составлена в соответствии с Федеральным
            законом «О персональных данных» № 152 - ФЗ от 27 июля 2006 г., а
            также иными нормативно - правовыми актами Российской Федерации в
            области защиты и обработки персональных данных.
          </p>
          <p className={styles.privacy_text}>
            1.2. К настоящей Политике, включая толкование ее положений и порядок
            принятия, исполнения, изменения и прекращения, подлежит применению
            законодательство Российской Федерации.
          </p>
          <p className={styles.privacy_text}>
            1.3. Политика действует в отношении всех персональных данных,
            которые обрабатывает Оператор.
          </p>
          <p className={styles.privacy_text}>
            1.4. Политика распространяется на отношения в области обработки
            персональных данных, возникшие у Оператора как до, так и после
            утверждения настоящей Политики.
          </p>
          <p className={styles.privacy_text}>
            1.5. Во исполнение требований ч. 2 ст. 18.1 Закона о персональных
            данных настоящая Политика публикуется в свободном доступе в
            информационно-телекоммуникационной сети Интернет на сайте Оператора.
          </p>
          <p className={styles.privacy_text}>
            1.6. В настоящей Политике используются следующие термины и
            определения:
          </p>

          <div className={styles.terms_list}>
            <div className={styles.term_item}>
              <span className={styles.term_title}>Оператор</span> – ИП
              Кабанченко Светлана Геннадьевна (ОГРНИП 321784700103601),
              учрежденное в соответствии с законодательством Российской
              Федерации.
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>Пользователь</span> – субъект
              персональных данных, являющийся посетителем Сайта, принимающий
              условия настоящей Политики, и желающий разместить или разместивший
              заказы в Интернет-магазине http://newartspace.ru/, либо
              использующий любые иные функции сайта.
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>Персональные данные</span> –
              любая информация, относящаяся к прямо или косвенно определенному
              или определяемому физическому лицу;
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>
                Обработка персональных данных
              </span>{' '}
              – любое действие (операция) или совокупность действий (операций),
              совершаемых с использованием средств автоматизации или без
              использования таких средств с Персональными данными, включая сбор,
              запись, систематизацию, накопление, хранение, уточнение
              (обновление, изменение), извлечение, использование, передачу
              (распространение, предоставление, доступ), обезличивание,
              блокирование, удаление, уничтожение Персональных данных;
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>
                Субъект Персональных данных
              </span>{' '}
              – физическое лицо, прямо или косвенно определенное или
              определяемое на основании полученной о нем информации.
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>
                Защита Персональных данных
              </span>{' '}
              – деятельность Компании, направленная на обеспечение режима
              конфиденциальности Персональных данных, установление и соблюдение
              порядка обработки Персональных данных, а также применение
              организационных и технических мер по обеспечению безопасности
              Персональных данных, иные меры в соответствии с законодательством
              РФ;
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>
                Конфиденциальная информация
              </span>{' '}
              – информация (в документированном или электронном виде), доступ к
              которой ограничивается в соответствии с законодательством РФ, а
              также локальными нормативными актами Компании;
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>
                Автоматизированная обработка персональных данных
              </span>{' '}
              – обработка персональных данных с использованием средств
              вычислительной техники;
            </div>

            <div className={styles.term_item}>
              <span className={styles.term_title}>
                Трансграничная передача персональных данных
              </span>{' '}
              – передача персональных данных на территорию иностранного
              государства органу власти иностранного государства, иностранному
              физическому лицу или иностранному юридическому лицу.
            </div>
          </div>

          <h2 className={styles.privacy_subtitle}>
            2. Права и обязанности Субъектов персональных данных и Оператора
          </h2>
          <p className={styles.privacy_text}>
            2.1. Субъект персональных данных имеет право:
          </p>
          <p className={styles.privacy_text}>
            2.1.1. на получение информации, касающейся обработки его
            персональных данных, в порядке, форме и сроки, установленные
            законодательством;
          </p>
          <p className={styles.privacy_text}>
            2.1.2. требовать уточнения своих персональных данных, их уничтожения
            или блокирования в случае, если персональные данные являются
            неполными, устаревшими, неточными, незаконно полученными или не
            являются необходимыми для заявленной цели обработки;
          </p>
          <p className={styles.privacy_text}>
            2.1.3. отозвать свое согласие на обработку персональных данных в
            соответствии с процедурой, указанной в настоящей Политике;
          </p>
          <p className={styles.privacy_text}>
            2.1.4. на исключение из рассылки информационных материалов
            Оператора;
          </p>
          <p className={styles.privacy_text}>
            2.1.5. осуществлять иные права, предусмотренные действующим
            законодательством.
          </p>

          <p className={styles.privacy_text}>2.2. Оператор имеет право:</p>
          <p className={styles.privacy_text}>
            2.2.1. обрабатывать персональные данные Субъектов персональных
            данных в соответствии в заявленными целями и с соблюдением
            установленных требований;
          </p>
          <p className={styles.privacy_text}>
            2.2.2. требовать от Субъектов персональных данных предоставления
            достоверных персональных данных, необходимых для достижения
            указанных целей;
          </p>
          <p className={styles.privacy_text}>
            2.2.3. ограничить доступ Субъекта персональных данных к его
            персональным данным в случаях, если обработка персональных данных
            осуществляется в соответствии с законодательством о противодействии
            легализации (отмыванию) доходов, полученных преступным путем, и
            финансированию терроризма, доступ субъекта персональных данных к его
            персональным данным нарушает права и законные интересы третьих лиц,
            а также в иных случаях, предусмотренных федеральным законом.
          </p>

          <p className={styles.privacy_text}>2.3. Оператор обязан:</p>
          <p className={styles.privacy_text}>
            2.3.1. организовывать обработку персональных данных в соответствии с
            требованиями Закона о персональных данных;
          </p>
          <p className={styles.privacy_text}>
            2.3.2. отвечать на обращения и запросы субъектов персональных данных
            и их законных представителей в соответствии с требованиями Закона о
            персональных данных;
          </p>
          <p className={styles.privacy_text}>
            2.3.3. сообщать в уполномоченный орган по защите прав субъектов
            персональных данных (Федеральную службу по надзору в сфере связи,
            информационных технологий и массовых коммуникаций (Роскомнадзор)) по
            запросу этого органа необходимую информацию в течение 30 дней с даты
            получения такого запроса.
          </p>

          <p className={styles.privacy_text}>
            2.4. Контроль за исполнением требований настоящей Политики
            осуществляется уполномоченным лицом, ответственным за организацию
            обработки персональных данных у Оператора.
          </p>
          <p className={styles.privacy_text}>
            2.5. Ответственность за нарушение требований законодательства
            Российской Федерации и нормативных актов Оператора в сфере обработки
            и защиты персональных данных определяется в соответствии с
            законодательством Российской Федерации
          </p>

          <h2 className={styles.privacy_subtitle}>
            3. Объем и категории обрабатываемых персональных данных
          </h2>
          <p className={styles.privacy_text}>
            3.1. Оператор обрабатывает персональные данные Субъектов
            персональных данных в пределах, ограниченных целями обработки
            персональных данных. В отношении Пользователей Сайта, под их
            персональными данными в настоящей Политике понимаются:
          </p>
          <p className={styles.privacy_text}>
            3.1.1. данные, предоставляемые Пользователем самостоятельно при
            регистрации или в процессе использования Сайта, а именно: паспортные
            данные, Фамилия, имя, отчество, дата рождения, адрес регистрации,
            (почтовый, рабочий адрес), телефоны (мобильный, стационарный), адрес
            электронной почты (e-mail), пароль от электронной почты на сайте
            https://newartspace.ru.
          </p>
          <p className={styles.privacy_text}>
            3.1.2. технические данные, которые передаются в автоматическом
            режиме Оператору в процессе использования Сайта с помощью
            установленного на устройстве Пользователя программного обеспечения,
            в том числе IP-адрес, данные файлов cookie, информация о браузере
            Пользователя (или иной программе, с помощью которой осуществляется
            доступ к Сайту), технические характеристики оборудования и
            программного обеспечения, используемых Пользователем, дата и время
            доступа к Сайту, адреса запрашиваемых страниц и иная подобная
            информация;
          </p>
          <p className={styles.privacy_text}>
            3.2. Оператор не обрабатывает специальные категории персональных
            данных Пользователей (сведения, касающиеся расовой, национальной
            принадлежности, политических взглядов, религиозных или философских
            убеждений, интимной жизни), а также их биометрические персональные
            данные.
          </p>
          <p className={styles.privacy_text}>
            3.3. Оператор не контролирует и не несет ответственность за
            обработку персональных данных Пользователей сайтами третьих лиц, на
            которые Пользователь может перейти по ссылкам, доступным на Сайте.
          </p>
          <p className={styles.privacy_text}>
            3.4. Оператор не проверяет и не несет ответственности за
            достоверность сведений, предоставляемых Пользователем на Сайте.
          </p>

          <h2 className={styles.privacy_subtitle}>
            4. Цели обработки персональных данных
          </h2>
          <p className={styles.privacy_text}>
            4.1. Оператор обрабатывает только те персональные данные, которые
            необходимы для достижения целей, определенных в пункте 4.2 настоящей
            Политики.
          </p>
          <p className={styles.privacy_text}>
            4.2. Персональные данные обрабатываются Оператором в целях:
          </p>
          <p className={styles.privacy_text}>
            4.2.1. Обеспечения соблюдения законодательства Российской Федерации;
          </p>
          <p className={styles.privacy_text}>
            4.2.2. Осуществления своей деятельности в соответствии с торговой
            деятельностью;
          </p>
          <p className={styles.privacy_text}>
            4.2.3. Осуществление гражданско-правовых отношений;
          </p>
          <p className={styles.privacy_text}>
            4.2.4. Обеспечения взаимодействия с клиентами и контрагентами
            Оператора, заключения и исполнения договоров с ними;
          </p>
          <p className={styles.privacy_text}>
            4.5.3. В отношении Пользователей Сайта, целями обработки их
            персональных данных Оператором являются: регистрация Пользователей
            на Сайте и оформление ими заказов товара, либо приобретение товаров
            на Сайте без регистрации; обработка запросов и заявок от
            Пользователей, направляемых ими через Сайт; улучшение качества
            работы Сайта, удобства его использования для Пользователей,
            разработка новых услуг и сервисов; таргетирование рекламных
            материалов; проведение рекламно-маркетинговых активностей, программ,
            акций, опросов, розыгрышей и т.д., а также для продвижения товаров и
            услуг на рынке путем осуществления прямых контактов
            (рекламно-информационной рассылки) с Пользователем с помощью
            различных средств связи, включая, но не ограничиваясь: почтовую
            рассылку, электронную почту, телефон, сеть Интернет; проведение
            статистических и иных исследований на основе обезличенных данных в
            целях улучшения качества услуг.
          </p>

          <h2 className={styles.privacy_subtitle}>
            5. Принципы обработки персональных данных
          </h2>
          <p className={styles.privacy_text}>
            5.1. Оператор обрабатывает персональные данные Субъектов
            персональных данных с учетом следующих принципов:
          </p>
          <p className={styles.privacy_text}>
            5.1.1. Персональные данные Субъекта персональных данных
            обрабатываются в заранее определенных и законных целях, которые
            перечислены в разделе 4 настоящей Политики.
          </p>
          <p className={styles.privacy_text}>
            5.1.2. Оператор обрабатывает только те персональные данные, которые
            необходимы для достижения целей, указанных в настоящей Политике.
          </p>
          <p className={styles.privacy_text}>
            5.1.3. Оператор обеспечивает точность и актуальность обрабатываемых
            персональных данных, их достаточность по отношению к целям
            обработки.
          </p>
          <p className={styles.privacy_text}>
            5.1.4. Оператор обеспечивает конфиденциальность при обработке
            персональных данных и применяет все необходимые меры в соответствии
            с пунктом 9.1 Политики.
          </p>

          <h2 className={styles.privacy_subtitle}>
            6. Порядок и условия обработки персональных данных и их передачи
            третьим лицам
          </h2>
          <p className={styles.privacy_text}>
            6.1. Обработка персональных данных Субъекта персональных данных
            включает в себя сбор, систематизацию, накопление, хранение,
            уточнение, использование, передачу третьим лицам как на территории
            Российской Федерации, так и трансграничную передачу, обезличивание,
            блокирование, уничтожение персональных данных для целей исполнения
            Оператором своих обязательств по настоящей Политике, как указано в
            разделе 4 Политики.
          </p>
          <p className={styles.privacy_text}>
            6.2. Персональные данные Субъекта персональных данных обрабатываются
            Оператором как с использованием средств автоматизации (с помощью
            автоматизированных систем управления базами данных, а также иных
            программных средств), так и без их использования.
          </p>
          <p className={styles.privacy_text}>
            6.3. Если это необходимо для реализации целей, указанных в настоящей
            Политике, Оператор может предоставить доступ или передать
            персональные данные другим компаниям. Кроме того, если это
            необходимо для достижения заявленных целей обработки персональных
            данных, доступ к персональным данным может предоставляться сторонним
            поставщикам, например поставщикам технологических услуг, услуг по
            управлению финансовыми операциями, логистике. Доступ к персональным
            данным/передача персональных данных осуществляются на основании
            договора, заключенного с такими лицами, при условии соблюдения
            такими третьими лицами конфиденциальности персональных данных и
            безопасности персональных данных при их обработке.
          </p>
          <p className={styles.privacy_text}>
            6.4. Персональные данные Субъекта персональных данных обрабатываются
            только с его согласия. Данное Субъектом персональных данных согласие
            на обработку его персональных данных является бессрочным и может
            быть отозвано им или его представителем посредством направления
            Субъектом персональных данных письменного заявления в адрес
            местонахождения Оператора, указанный в настоящей Политике, либо
            направления письменного уведомления на электронный адрес
            (9326215@mail.ru).
          </p>

          <h2 className={styles.privacy_subtitle}>
            7. Изменение и удаление персональных данных. Обязательное хранение
            данных
          </h2>
          <p className={styles.privacy_text}>
            7.1. Оператор обязан по требованию Субъекта персональных данных
            уточнять, блокировать или удалять обрабатываемые персональные
            данные, если персональные данные являются неполными, устаревшими,
            неточными, незаконно полученными или не являются необходимыми для
            заявленной цели обработки.
          </p>
          <p className={styles.privacy_text}>
            7.1.1. Оператор обязан в срок, не превышающий 10 (десять)
            календарных дней со дня предоставления Субъектом персональных данных
            сведений о том, что персональные данные являются неполными,
            неточными или неактуальными, внести в них изменения и уведомить об
            этом Субъекта персональных данных.
          </p>
          <p className={styles.privacy_text}>
            7.1.2. Персональные данные подлежат уничтожению в следующих случаях:
          </p>
          <ol className={styles.privacy_list}>
            <li className={styles.privacy_list_item}>
              при невозможности обеспечения правомерной обработки персональных
              данных в срок, не превышающий 15 (пятнадцать) календарных дней с
              даты выявления неправомерной обработки;
            </li>
            <li className={styles.privacy_list_item}>
              при поступлении письменного заявления Субъекта персональных данных
              об уничтожении персональных данных либо отзыве согласия
              Пользователя на обработку персональных данных;
            </li>
            <li className={styles.privacy_list_item}>
              достижения цели обработки персональный данных или утраты
              необходимости в ее достижении;
            </li>
            <li className={styles.privacy_list_item}>
              истечение сроков хранения персональных данных.
            </li>
          </ol>
          <p className={styles.privacy_text}>
            7.1.3. Персональные данные подлежат уничтожению в течение 30
            (тридцати) календарных дней, если иной срок не предусмотрен
            законодательством РФ или Политикой.
          </p>
          <p className={styles.privacy_text}>
            7.2. Права, предусмотренные положениями настоящей Политики, могут
            быть ограничены в соответствии с требованиями законодательства.
            Например, такие ограничения могут предусматривать обязанность
            Оператора сохранить измененную или удаленную Пользователем
            информацию на срок, установленный законодательством, и передать
            такую информацию в соответствии с законодательно установленной
            процедурой государственному органу.
          </p>
          <p className={styles.privacy_text}>
            7.3. Хранение персональных данных осуществляется не дольше, чем
            этого требуют цели обработки персональных данных, если срок хранения
            персональных данных не установлен федеральным законом, договором,
            стороной которого, выгодоприобретателем или поручителем, по которому
            является субъект персональных данных.
          </p>

          <h2 className={styles.privacy_subtitle}>
            8. Обработка персональных данных при помощи файлов Cookie и
            счетчиков
          </h2>
          <p className={styles.privacy_text}>
            8.1. Файлы cookie, передаваемые Оператором оборудованию Пользователя
            и оборудованием Пользователя Сайту, могут использоваться Оператором
            для предоставления Пользователю персонализированных сервисов, для
            таргетирования рекламы, которая показывается Пользователю, в
            статистических и исследовательских целях, а также для улучшения
            работы Сайта.
          </p>
          <p className={styles.privacy_text}>
            8.2. Пользователь осознает, что оборудование и программное
            обеспечение, используемые им для посещения сайтов в сети Интернет,
            могут обладать функцией запрещения операций с файлами cookie (для
            любых сайтов или для определенных сайтов), а также удаления ранее
            полученных файлов cookie.
          </p>
          <p className={styles.privacy_text}>
            8.3. Поисковые системы вправе установить, что предоставление
            определенного сервиса или услуги возможно только при том условии,
            когда прием и получение файлов cookie разрешены Пользователем.
          </p>
          <p className={styles.privacy_text}>
            8.4. Структура файла cookie, его содержание и технические параметры
            определяются Оператором и могут изменяться без предварительного
            уведомления Пользователя.
          </p>
          <p className={styles.privacy_text}>
            8.5. Счетчики, размещенные Сайтом, могут использоваться для анализа
            файлов cookie Пользователя, для сбора и обработки статистической
            информации об использовании Сайта, а также для обеспечения
            работоспособности Сайта в целом или их отдельных функций в
            частности. Технические параметры работы счетчиков определяются
            Оператором и могут изменяться без предварительного уведомления
            Пользователя.
          </p>

          <h2 className={styles.privacy_subtitle}>
            9. Защита персональных данных
          </h2>
          <p className={styles.privacy_text}>
            9.1. Оператор предпринимает необходимые и достаточные правовые,
            организационные и технические меры для защиты персональных данных
            Субъектов персональных данных от неправомерного или случайного
            доступа, уничтожения, изменения, блокирования, копирования,
            распространения, а также от иных неправомерных действий с ними
            третьих лиц.
          </p>
          <p className={styles.privacy_text}>
            9.2. В целях обеспечения адекватной защиты персональных данных,
            Оператор проводит оценку вреда, который может быть причинен в случае
            нарушения безопасности персональных данных, а также определяет
            актуальные угрозы безопасности персональных данных при их обработке
            в информационных системах персональных данных.
          </p>

          <h2 className={styles.privacy_subtitle}>10. Изменение Политики</h2>
          <p className={styles.privacy_text}>
            10.1. Оператор имеет право вносить изменения в настоящую Политику
            без согласия Субъекта персональных данных. При внесении изменений в
            актуальной редакции указывается дата последнего обновления. Новая
            редакция Политики вступает в силу с момента ее размещения и
            действует до момента утверждения Политики в новой редакции, если
            иное не предусмотрено новой редакцией Политики. Действующая редакция
            постоянно доступна на странице по адресу http://newartspace.ru/.
          </p>

          <h2 className={styles.privacy_subtitle}>
            11. Контакты и вопросы по персональным данным
          </h2>
          <p className={styles.privacy_text}>
            11.1. Все предложения, вопросы, запросы и иные обращения по поводу
            настоящей Политики и использования своих персональных данных Субъект
            персональных данных вправе направлять Оператору:
          </p>
          <p className={styles.privacy_text}>
            -по адресу электронной почты: (9326215@mail.ru)
          </p>
          <p className={styles.privacy_text}>
            -по почтовому адресу: г.Санкт-Петербург, ул. Ново-Рыбинская, 19-21,
            пом. 9
          </p>
        </div>
      </section>
    </main>
  )
}
