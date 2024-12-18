{Events.map((item) => (
    <>
      {/* // FOR FATHER EVENTS */}
      {item.father?.name ? (
        <>
          <tr key={item?.id}>
            <td>
              <div className=" px-2 py-1">
                <div className=" flex-column justify-content-center">
                  <h6 className="mb-0 text-sm">
                    {item.father.name}
                  </h6>
                </div>
              </div>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary  mb-0">
                {item.father.relationType}
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary mb-0">
                {item.father.eventType}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span className="badge badge-sm bg-gradient-success">
                {item.userid?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                wishlist count
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                {item.father.invitedUsers?.length}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span>
                <MdVisibility
                  className={`${Styles.delicon}`}
                  onClick={(e) =>
                    handleShow(
                      e,
                      item?.father,
                      item?._id
                    )
                  }
                />
              </span>
            </td>
          </tr>
        </>
      ) : (
        ""
      )}

      {/* FOR MOTHER EVENTS */}
      <tr key={item.id}>
        <td>
          <div className=" px-2 py-1">
            <div className=" flex-column justify-content-center">
              <h6 className="mb-0 text-sm">
                {item.mother.name}
              </h6>
            </div>
          </div>
        </td>
        <td className="align-middle text-center">
          <p className="text-xs font-weight-bold text-secondary  mb-0">
            {item.mother.relationType}
          </p>
        </td>
        <td className="align-middle text-center">
          <p className="text-xs font-weight-bold text-secondary mb-0">
            {item.mother.eventType}
          </p>
        </td>
        <td className="align-middle text-center text-sm">
          <span className="badge badge-sm bg-gradient-success">
            {item.userid?.name}
          </span>
        </td>
        <td className="align-middle text-center">
          <p className="text-xs font-weight-bold  text-secondary mb-0">
            wishlist count
          </p>
        </td>
        <td className="align-middle text-center">
          <p className="text-xs font-weight-bold  text-secondary mb-0">
            {item.mother.invitedUsers?.length}
          </p>
        </td>
        <td className="align-middle text-center text-sm">
          <span>
            <MdVisibility
              className={`${Styles.delicon}`}
              onClick={(e) =>
                handleShow(e, item?.mother, item?._id)
              }
            />
          </span>
        </td>
      </tr>

      {/* FOR PARENTSANNIVERSARY */}
      {item.parentsAnniversary?.anniversaryDate ? (
        <>
          <tr key={item.id}>
            <td>
              <div className=" px-2 py-1">
                <div className=" flex-column justify-content-center">
                  <h6 className="mb-0 text-sm">
                    {item.parentsAnniversary.name
                      ? item.parentsAnniversary.name
                      : "--"}
                  </h6>
                </div>
              </div>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary  mb-0">
                {item.parentsAnniversary.relationType}
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary mb-0">
                {item.parentsAnniversary.eventType}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span className="badge badge-sm bg-gradient-success">
                {item.userid?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                wishlist count
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                {
                  item.parentsAnniversary.invitedUsers
                    ?.length
                }
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span>
                <MdVisibility
                  className={`${Styles.delicon}`}
                  onClick={(e) =>
                    handleShow(
                      e,
                      item?.parentsAnniversary,
                      item?._id
                    )
                  }
                />
              </span>
            </td>
          </tr>
        </>
      ) : (
        ""
      )}

      {/* FOR MY ANNIVERSARY */}
      {item.myAnniversary.anniversaryDate ? (
        <>
          <tr key={item.id}>
            <td>
              <div className=" px-2 py-1">
                <div className=" flex-column justify-content-center">
                  <h6 className="mb-0 text-sm">
                    {item.myAnniversary.name
                      ? item.myAnniversary.name
                      : "--"}
                  </h6>
                </div>
              </div>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary  mb-0">
                {item.myAnniversary.relationType}
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary mb-0">
                {item.myAnniversary.eventType}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span className="badge badge-sm bg-gradient-success">
                {item.userid?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                wishlist count
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                {
                  item.myAnniversary.invitedUsers
                    ?.length
                }
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span>
                <MdVisibility
                  className={`${Styles.delicon}`}
                  onClick={(e) =>
                    handleShow(
                      e,
                      item?.myAnniversary,
                      item?._id
                    )
                  }
                />
              </span>
            </td>
          </tr>
        </>
      ) : (
        ""
      )}

      {/* FOR HUSBAND  */}
      {item.husband?.name ? (
        <>
          <tr key={item.id}>
            <td>
              <div className=" px-2 py-1">
                <div className=" flex-column justify-content-center">
                  <h6 className="mb-0 text-sm">
                    {item.husband.name
                      ? item.husband.name
                      : "--"}
                  </h6>
                </div>
              </div>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary  mb-0">
                {item.husband.relationType}
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary mb-0">
                {item.husband.eventType}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span className="badge badge-sm bg-gradient-success">
                {item.userid?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                wishlist count
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                {item.husband.invitedUsers?.length}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span>
                <MdVisibility
                  className={`${Styles.delicon}`}
                  onClick={(e) =>
                    handleShow(
                      e,
                      item?.husband,
                      item?._id
                    )
                  }
                />
              </span>
            </td>
          </tr>
        </>
      ) : (
        ""
      )}

      {/* FOR WIFE  */}
      {item.wife?.name ? (
        <>
          <tr key={item.id}>
            <td>
              <div className=" px-2 py-1">
                <div className=" flex-column justify-content-center">
                  <h6 className="mb-0 text-sm">
                    {item.wife.name
                      ? item.wife.name
                      : "--"}
                  </h6>
                </div>
              </div>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary  mb-0">
                {item.wife.relationType}
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold text-secondary mb-0">
                {item.wife.eventType}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span className="badge badge-sm bg-gradient-success">
                {item.userid?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                wishlist count
              </p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold  text-secondary mb-0">
                {item.wife.invitedUsers?.length}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <span>
                <MdVisibility
                  className={`${Styles.delicon}`}
                  onClick={(e) =>
                    handleShow(
                      e,
                      item?.wife,
                      item?._id
                    )
                  }
                />
              </span>
            </td>
          </tr>
        </>
      ) : (
        ""
      )}

      {/* FOR CHILDREN  */}
      {item.children.length > 0 ? (
        <>
          <tr key={item.id}>
            {item.children.map((ele, index) => (
              <>
                <td>
                  <div className=" px-2 py-1">
                    <div className=" flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">
                        {ele?.name}
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold text-secondary  mb-0">
                    {ele.relationType}
                  </p>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold text-secondary mb-0">
                    {ele.eventType}
                  </p>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="badge badge-sm bg-gradient-success">
                    {item.userid?.name}
                  </span>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold  text-secondary mb-0">
                    wishlist count
                  </p>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold  text-secondary mb-0">
                    {ele?.invitedUsers?.length}
                  </p>
                </td>
                <td className="align-middle text-center text-sm">
                  <span>
                    <MdVisibility
                      className={`${Styles.delicon}`}
                      onClick={(e) =>
                        handleShow(
                          e,
                          ele,
                          item?._id
                        )
                      }
                    />
                  </span>
                </td>
              </>
            ))}
          </tr>
        </>
      ) : (
        ""
      )}

      {/* FOR SIBLINGS  */}
      {item?.siblings.length > 0 ? (
        <>
          <tr key={item.id}>
            {item.siblings.map((ele) => (
              <>
                <td>
                  <div className=" px-2 py-1">
                    <div className=" flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">
                        {ele?.name}
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold text-secondary  mb-0">
                    {ele.relationType}
                  </p>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold text-secondary mb-0">
                    {ele.eventType}
                  </p>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="badge badge-sm bg-gradient-success">
                    {item.userid?.name}
                  </span>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold  text-secondary mb-0">
                    wishlist count
                  </p>
                </td>
                <td className="align-middle text-center">
                  <p className="text-xs font-weight-bold  text-secondary mb-0">
                    {ele?.invitedUsers?.length}
                  </p>
                </td>
                <td className="align-middle text-center text-sm">
                  <span>
                    <MdVisibility
                      className={`${Styles.delicon}`}
                      onClick={(e) =>
                        handleShow(e, ele, item?._id)
                      }
                    />
                  </span>
                </td>
              </>
            ))}
          </tr>
        </>
      ) : (
        ""
      )}
    </>
  ))}