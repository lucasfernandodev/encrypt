const Alert = (title, message, type, time) => {


  let timer = null;
  let count = 100

  const currentDuration = time ?? 40;
  const alertImagePath = {
    success: '/assets/img/alert-icon-sucess.svg',
    error: '/assets/img/alert-icon-error.svg'
  }


  function create(title, message, type) {

    const alert = document.createElement('div');
    alert.className = "alert" + ` ${type}`;


    const alerts = document.querySelectorAll('.alert');

    if (alerts.length >= 1) {
      const gap = alerts.length > 1 ? ((16 * (alerts.length - 1)) + 16) : 16;
      const bottomGap = getComputedStyle(document.documentElement).getPropertyValue('--position')
      const alertsHeight = alerts[0].getBoundingClientRect().height;
      const positionBottom = (alertsHeight * alerts.length) + gap + parseInt(bottomGap.replace("px", ""));
      console.log(bottomGap)
      alert.style.bottom = `${positionBottom}px`
    }

    const alertIcon = document.createElement('div');
    alertIcon.className = 'icon'

    const alertIconImage = document.createElement('img');
    alertIconImage.src = type === 'success' ? alertImagePath.success : alertImagePath.error


    const alertContent = document.createElement('div');
    alertContent.className = 'content'

    const alertContentTitle = document.createElement('h4');
    alertContentTitle.className = "title"
    alertContentTitle.textContent = title

    const alertContentText = document.createElement('p');
    alertContentText.textContent = message

    alertContent.appendChild(alertContentTitle)
    alertContent.appendChild(alertContentText)
    alertIcon.appendChild(alertIconImage)
    alert.appendChild(alertIcon)
    alert.appendChild(alertContent)

    const node = document.querySelector('body').appendChild(alert);

    node.addEventListener('click', () => {
      node.parentElement.removeChild(node)
    })
    return node;
  }

  function updateCurrentPosition(Element) {
    const alertElements = document.querySelectorAll('.alert');
    const currentElement = Array.from(alertElements).findIndex(value => value === Element);
    const positionOfBottom = Element.style.bottom.replace("px", "");


    if (alertElements.length >= 1) {
      const gap = alertElements.length > 1 ? ((16 * currentElement) + 16) : 16;
      const bottomGap = getComputedStyle(document.documentElement).getPropertyValue('--position')
      const alertsHeight = Element.getBoundingClientRect().height;
      const positionBottom = (alertsHeight * currentElement) + gap + parseInt(bottomGap.replace("px", ""));
      const positionDiff = positionOfBottom - positionBottom;


      if (positionBottom < parseInt(positionOfBottom)) {
        Element.style.transform = `translateY(${positionDiff}px)`
      }
    }
  }

  function Animation(Element) {

    timer = setInterval(() => {

      updateCurrentPosition(Element)
      Element.style.setProperty('--widthLoading', `${count}%`);
      count = count - 1;

      if (count < 0 || Element === null) {
        clearInterval(timer)
        count = 100
        Element.parentNode.removeChild(Element)

        return;
      }

    }, currentDuration)
  }


  const alert = create(title, message, type)
  Animation(alert);
};

export default Alert;